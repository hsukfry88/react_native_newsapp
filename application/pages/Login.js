/*登录页面*/
'use strict';
import React, { Component} from 'react';
import { View} from 'react-native';
import Container from '../containers/Login';
import { CommonStyle} from '../config/theam';

class Login extends Component {
    render() {
        return (
            <View style={CommonStyle.container}>
                <Container/>               
            </View>
        )
    }
}

export default Login;