'use strict';

import React, { Component} from 'react';
import Container from '../containers/UserInfo';
import { View} from 'react-native';
import { Form, CommonStyle} from '../config/theam';

class UserInfo extends Component {
    render() {
        return (
            <View style={CommonStyle.container}>
                <Container/>
            </View>
        )
    }
}
export default UserInfo;