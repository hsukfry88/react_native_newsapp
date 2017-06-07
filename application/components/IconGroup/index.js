'use strict';

import React, { Component} from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import { Icon, SocialIcon} from 'react-native-elements';
import { Actions} from 'react-native-router-flux';
import { dataSource} from './dataSource';
import { Color, IconGroupTheam, CommonStyle} from '../../config/theam';
const IconGroup = ({extend, selected, router, actionType}) => {
    Object.assign(dataSource, extend);
    //console.log(selected);
    return (
        <View style={[IconGroupTheam.Container]}>
                {
        dataSource.map((icon, i) => <View key={i} style={IconGroupTheam.titleCenter} >
            <Icon
            reverse
            name={icon.name}
            type={icon.type}
            color={selected == i ? Color.gray9 : icon.color }
            size={IconGroupTheam.size}
            onPress={() => {
                router({
                    selected: i,
                    title: icon.title,
                    type: actionType,
                    policy: icon.policy,
                })
            }}/>
            <Text style={IconGroupTheam.titleStyle}>{icon.title}</Text></View>)
        }
        </View>
    )
}
export default IconGroup;