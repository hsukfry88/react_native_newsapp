/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component} from 'react';
import { AppRegistry, StyleSheet, Text, View, StatusBar, Dimensions} from 'react-native';
import NavScreen from './application/components/Router';
import { Actions} from 'react-native-router-flux';
import { LoginSchema, BannerSchema, AnnouncementSchema, HotPolicySchema, RegisterSchema, StartPolicySchema} from './application/realm/schema';
import myRealm from './application/realm/register';

export default class App extends Component {
    constructor(props) {
        super(props);
        const schema = [LoginSchema, RegisterSchema, AnnouncementSchema, BannerSchema, HotPolicySchema, StartPolicySchema];
        global.Actions = Actions;
        global.realm = new myRealm(schema);
        global.screenWidth = Dimensions.get('window').width;
        global.screenHeight = Dimensions.get('window').height;
    }
    render() {
        return (
            <View style={{
                flex: 1
            }}>
						<StatusBar barStyle="light-content"/>
						<NavScreen />
			</View>
        )
    }
}

AppRegistry.registerComponent('newsapp', () => App);