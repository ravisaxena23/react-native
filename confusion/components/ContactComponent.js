
import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

//Contact
class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us',
    };

    render() {
        
        return(
            <Card title="Contact Information">
                    <Text style={cstyles.forparagraph} >
                        121, Clear Water Bay Road{'\n'}
                        Clear Water Bay, Kowloon{'\n'}
                        HONG KONG{'\n'}
                        Tel: +852 1234 5678{'\n'}
                        Fax: +852 8765 4321{'\n'}
                        Email:confusion@food.net
                    </Text>
                </Card>
        );
    }
}
//styles
const cstyles = StyleSheet.create({
    forparagraph: {
      marginRight: 81,
      textAlign: 'left',
      color: '#34495e',
    },
  });
  
export default Contact;