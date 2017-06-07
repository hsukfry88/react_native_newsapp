'use strict';
import React, { Component} from 'react';
import { View} from 'react-native';
import IconInput from './IconInput';
import ErrorIcon from './ErrorIcon';
import MessageBtn from './MessageBtn';

class GroupForm extends Component {
    render() {
        const {defaultValue, placeholder, status, errAleart, btn, icon, size, messageBtn, sendMessage, VerficatCode, onChange, disabled} = this.props;
        // console.log(status);
        const Btn = <MessageBtn  messageBtn={messageBtn} onPress={sendMessage} disabled={disabled}/>
        return (
            <View>
                <IconInput onChange={onChange} placeholder={placeholder} iconName={icon} size={size} defaultValue={defaultValue}/>
                {btn ? Btn : null}
                <ErrorIcon status={status} text={errAleart}/>
            </View>
        )
    }
}
export default GroupForm;