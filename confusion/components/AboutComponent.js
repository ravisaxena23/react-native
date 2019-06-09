import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList,Text } from 'react-native';
import { LEADERS } from '../shared/leaders';
import { Card, ListItem } from 'react-native-elements';

//Provide styles
const newstyles = StyleSheet.create({
    forparagraph: {
      marginRight: 25,
      textAlign: 'left',
      color: '#34495e',
    },
  });


function History(props) {
        return(
            <Card title="Our History">
                <Text style={newstyles.forparagraph} >
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                {'\n'}
                The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
                </Text>
            </Card>
        );
}
//About
class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaders: LEADERS
        };
    }
    static navigationOptions = {
        title: 'About Us',
    };

    render() {
        const renderLeader = ({item, index}) => {
            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    leftAvatar={{ source: require('../images/alberto.png')}}
                />
            );
        };
        return(
            <ScrollView>
                <History/>
                <Card title="Corporate Leadership">
                    <FlatList 
                            data={this.state.leaders}
                            renderItem={renderLeader}
                            keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );
    }
}  
export default About;