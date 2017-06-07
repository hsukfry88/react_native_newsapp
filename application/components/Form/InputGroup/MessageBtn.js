'use strict';

import React, { Component} from 'react';

import { StyleSheet, View} from 'react-native';
import { Button} from 'react-native-elements';
import { CommonStyle, FS, Color, Form, theam} from '../../../config/theam';
import { MessageCode} from '../../FormValidation';
class MessageBtn extends Component {
    render() {
        const {messageBtn, disabled} = this.props;
        return (
            <Button  title={messageBtn} fontSize={FS.fs14} color={Color.gray9}  buttonStyle={theam.buttonStyle}  disabledStyle={theam.disableButton} onPress={this.active} disabled={disabled}/>
            );
    }
    active = () => {
        this.props.onPress();
    }
}
export default MessageBtn;