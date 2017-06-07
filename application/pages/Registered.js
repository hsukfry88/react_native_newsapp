'use strict';

import React, { Component} from 'react';
import RegisterForm from '../containers/Register';
import { View} from 'react-native';
import { Form, CommonStyle} from '../config/theam';

class Registered extends Component {
    render() {
        return (
            <View style={CommonStyle.container}>
            <RegisterForm  {...this.props}/>
          </View>
        )
    }
}
export default Registered;