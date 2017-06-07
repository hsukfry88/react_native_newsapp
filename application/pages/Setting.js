'use strict';
import React, { Component} from 'react';
import { CommonStyle, Color} from '../config/theam';
import Container from '../containers/Setting';
import { View} from 'react-native';

class Setting extends Component {
    render() {
        return (
            <View style={[CommonStyle.fullScreen, {
                backgroundColor: Color.graye
            }]}>
            		<Container/>
            </View>
        )
    }
}
export default Setting;