'use strict';

import React, { Component} from 'react';

import { StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import { Color, theam, CommonStyle} from '../../config/theam';

class index extends Component {
    render() {
        const {show, progressStyle} = this.props;
        const progress = <View style={[CommonStyle.center, {
            backgroundColor: Color.white,
            opacity: .85,
        }]}>
              <View style={progressStyle}>
                  <ActivityIndicator style={CommonStyle.ActivityIndicator} color={Color.white}/>
                  <Text style={CommonStyle.progressText}>正在拼命提交中...</Text>
              </View>
            </View>
        return (
        show ? progress : null
        )
    }
}

export default index;