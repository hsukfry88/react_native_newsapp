'use strict';

import React, {
	Component
} from 'react';

import {
	StyleSheet,
	View,
	ActivityIndicator,
	Text
} from 'react-native';

class index extends Component {
	render() {
		return (
			<View style={{position:'absolute',flex:1,zIndex:90,top:0,bottom:0,left:0,right:0,justifyContent:'center',alignItems:'center'}}>
              <View style={{width:160,height:80,backgroundColor:'#333',borderRadius:7,flexDirection:'column',justifyContent:'center',alignItems:'center',opacity:.75}}>
                  <ActivityIndicator style={[{alignItems: 'center',justifyContent:'center',padding: 8}]} color="#fff"/>
                  <Text style={{color:'#fff'}}>正在拼命提交中...</Text>
              </View>
       </View>
		);
	}
}

const styles = StyleSheet.create({

});


export default index;