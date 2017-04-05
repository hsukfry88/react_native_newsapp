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


class ErrorPage extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={{marginTop:-100}}>
				<Image style={{height:120,width:120}}  source={require('../../images/loading.gif')}  />
					<Text style={styles.alert}>请检查您的网络...</Text>
				</View>
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
	gray: {
		color: '#999'
	},
	alert: {
		fontSize: 14,
		lineHeight: 26,
		color: '#999'
	}
});
export default ErrorPage;