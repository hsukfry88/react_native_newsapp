/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component} from 'react';
import { AppRegistry, Text, View, StatusBar, Dimensions} from 'react-native';
import { CommonStyle} from './application/config/theam';
import Screen from './application/components/screen';
import { Actions} from 'react-native-router-flux';
import { LoginSchema, BannerSchema, AnnouncementSchema, HotPolicySchema, RegisterSchema, StartPolicySchema} from './application/realm/schema';
import myRealm from './application/realm/register';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import reducer from './application/reducers';
const store = createStore(reducer);


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
            <Provider store={store}>
                <View style={CommonStyle.fullScreen}>
                    <StatusBar barStyle="light-content"/>
                    <Screen/>
                </View>
            </Provider>
        )
    }
}

AppRegistry.registerComponent('newsapp', () => App);