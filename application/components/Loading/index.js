'use strict';

import React, {
	Component
} from 'react';

import {
	StyleSheet,
	View,
	Text,
	Image
} from 'react-native';

class Loading extends Component {
	render() {
		return (
			<View style={styles.container}>
					<Image style={{height:120,width:120,marginTop:140}}  source={require('../../images/loading.gif')}  />
					<Text style={styles.alert}>loading...</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	alert: {
		fontSize: 14,
		lineHeight: 26,
		color: '#999'
	}
});


export default Loading;