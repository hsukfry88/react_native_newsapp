'use strict';

import React, {
  Component
} from 'react';
import Nav from '../components/Nav';
import {
  theam,
  Margin
} from '../config/theam';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


class subscribe extends Component {
  render() {
    return (
      <View style={theam.Container}>
          <ScrollView style={Margin.top60}> 
               <Text>{this.props.text}</Text>
               <View style={{marginTop:60}}>
                  <MyComponent/>
               </View>
          </ScrollView>
          <Nav selected="2"/>
     	</View>
    );
  }
}

const styles = StyleSheet.create({

});


export default subscribe;