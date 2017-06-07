'use strict';
import React, { Component} from 'react';
import { CommonStyle, theam} from '../../config/theam';
import { View, Image} from 'react-native';
const LogoIcon = () => {
    return (
        <View style={CommonStyle.contentCenter}>
            <Image source={require('../../images/logo.png')} style={theam.welcomeImg}/>
        </View>
    )
}
export default LogoIcon;