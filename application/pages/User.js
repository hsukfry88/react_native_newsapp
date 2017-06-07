'use strict';

import React, { Component} from 'react';
import NavBar from '../components/NavBar';
import { ScrollView, View} from 'react-native';
import { CommonStyle, Color} from '../config/theam';
import Container from '../containers/User';


class User extends Component {
    render() {
        return (
            <View style={[CommonStyle.fullScreen, {
                backgroundColor: Color.graye
            }]}>
                <Container/>                
                <NavBar selected="3"/>
            </View>
        )
    }
}

export default User;