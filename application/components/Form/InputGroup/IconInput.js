'use strict';
import React, { Component} from 'react';
import { View, Text} from 'react-native';
import { FormInput} from 'react-native-elements';
import { Form, CommonStyle} from '../../../config/theam';
import { Icon} from 'react-native-elements';
const IconInput = ({onChange, placeholder, iconName, size, defaultValue}) => {
    return (
        <View>
	        <FormInput inputStyle={Form.InputStyle} containerStyle={Form.InputContainer}  underlineColorAndroid="transparent" onChangeText={(text) => {
            onChange(text)
        }} keyboardType={'numeric'} defaultValue={defaultValue} placeholder={placeholder}/>
	        <Icon containerStyle={Form.FormIcon} type={Form.IconType} name={iconName} color={Form.InputIconColor} size={size ? size : CommonStyle.IconSize} />
       </View>
    )
}
export default IconInput;