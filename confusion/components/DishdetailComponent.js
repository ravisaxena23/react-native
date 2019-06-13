import React from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  StyleSheet,
  Button
} from "react-native";
import { Card, Rating, Input, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => ({
  postFavorite: dishId => dispatch(postFavorite(dishId)),
  postComment: (id, dishId, ratings, author, comment) =>
    dispatch(postComment(id, dishId, ratings, author, comment))
});

function RenderComments(props) {
  const comments = props.comments;
  alert(JSON.stringify(comments));
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating
          imageSize={15}
          readonly
          startingValue={item.rating}
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop: 5,
            marginBottom: 5
          }}
        />
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  };

  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}

function RenderDish(props) {
  const dish = props.dish;

  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Icon
            raised
            reverse
            name={props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() =>
              props.favorite ? console.log("Already favorite") : props.onPress()
            }
          />
          <Icon
            raised
            reverse
            name={"pencil"}
            type="font-awesome"
            color="#512DA8"
            onPress={() => props.openModal()}
          />
        </View>
      </Card>
    );
  } else {
    return <View />;
  }
}

class DishDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      showModal: false,
      author: "",
      comment: "",
      ratings: 0
    };
  }

  static navigationOptions = {
    title: "Dish Details"
  };

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  postComment(dishId) {
    var id = this.props.comments.comments.length;
    this.props.postComment(
      id,
      dishId,
      this.state.ratings,
      this.state.author,
      this.state.comment
    );
    this.toggleModal();
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const dishId = this.props.navigation.getParam("dishId", "");
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          openModal={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            comment => comment.dishId === dishId
          )}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              showRating
              startingValue={0}
              onFinishRating={rating =>
                this.setState({
                  ratings: rating
                })
              }
            />
            <Input
              placeholder="Author"
              inputStyle={styles.margin10}
              leftIconContainerStyle={styles.margin10}
              leftIcon={
                <Icon
                  name="user"
                  size={24}
                  type="font-awesome"
                  style={{ marginRight: 10 }}
                />
              }
              onChangeText={text => this.setState({ author: text })}
            />
            <Input
              inputStyle={styles.margin10}
              placeholder="Comment"
              leftIcon={
                <Icon
                  name="comment"
                  size={24}
                  type="font-awesome"
                  style={{ marginRight: 10 }}
                />
              }
              onChangeText={text => this.setState({ comment: text })}
            />
            <View style={styles.btnSubmitStyle}>
              <Button
                onPress={() => {
                  this.postComment(dishId);
                }}
                color="#512DA8"
                title="Submit"
              />
            </View>
            <View style={styles.margin10}>
              <Button
                onPress={() => {
                  this.toggleModal();
                }}
                color="gray"
                title="Cancel"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  },
  margin10: {
    margin: 10
  },
  btnSubmitStyle: {
    marginTop: 30,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishDetail);