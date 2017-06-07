'use strict';
import React, { Component} from 'react';
import { Form} from '../../../config/theam';
import { Icon} from 'react-native-elements';
import { StyleSheet, Text, View} from 'react-native';
const ErrorIcon = ({status, text}) => {
    const err = <View style={Form.errorAlert}><Icon name='exclamation-circle' type={Form.IconType} color={Form.errorIconColor} size={Form.errorIconSize}/><Text style={Form.errorText}>{text}</Text></View>
    return (
        <View>
             { status ? null : err}
        </View>
    )
}
export default ErrorIcon;