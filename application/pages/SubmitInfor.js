'use strict';

import React, { Component} from 'react';
import { View} from 'react-native';
import { Form, CommonStyle} from '../config/theam';
import FormGroup from '../containers/Declare';
import NavBar from '../components/NavBar';


class SubmitInfor extends Component {
    render() {
        return (
            <View style={CommonStyle.container}>
                <FormGroup {...this.props}/>
                <NavBar selected="2"/>
            </View>
        )
    }
}
export default SubmitInfor;