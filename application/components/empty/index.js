'use strict';

import React, {
	Component
} from 'react';

import {
	StyleSheet,
	View,
	Text
} from 'react-native';

class index extends Component {
	render() {
		return (
			<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
				<Text style={{color:'#999'}}>对不起，该栏目正在整理中,敬请期待...</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({

});


export default index;