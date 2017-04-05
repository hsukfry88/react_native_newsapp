'use strict';

import React, {
	Component
} from 'react';
import {
	StyleSheet,
	Text,
	View,
	StatusBar
} from 'react-native';
import {
	Icon,
	SocialIcon
} from 'react-native-elements';
import {
	Actions
} from 'react-native-router-flux';
import {
	dataSource
} from './dataSource';
import {
	Color,
	FS
} from '../../config/theam';
const IconSize = 14;
const IconGroup = ({
	extend,
	selected,
	onPress
}) => {

	Object.assign(dataSource, extend);
	return (
		<View style={styles.Container}>
				{
		dataSource.map((icon, i) => <View key={i} style={styles.titleCenter} ><Icon reverse  name={icon.name} type={icon.type} color={ selected == i ? Color.gray9: icon.color } size={IconSize} onPress={() =>Actions.SearchContainer({policyType:i+1,title:icon.title,type:'replace'})}  /><Text style={styles.titleStyle}>{icon.title}</Text></View>)
				}
		</View>
	)
}

const styles = StyleSheet.create({
	Container: {
		height: 70,
		padding: 7,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: '#fff',
	},
	fs: {
		fontSize: 10,
	},
	titleCenter: {
		flex: 1,
		marginBottom: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleStyle: {
		color: Color.gray3,
		fontSize: FS.fs12
	}
});


export default IconGroup;