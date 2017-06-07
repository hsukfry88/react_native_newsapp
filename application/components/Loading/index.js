'use strict';

import React, { Component} from 'react';

import { StyleSheet, View, Text, Image} from 'react-native';
import { CommonStyle} from '../../config/theam';
class Loading extends Component {
    render() {
        return (
            <View style={[CommonStyle.center, {
                backgroundColor: '#fff'
            }]}>
								<Image style={{
                height: 120,
                width: 120
            }}  source={require('../../images/loading.gif')}/>
								<Text style={styles.alert}>loading...</Text>
						</View>
            );
    }
}

const styles = StyleSheet.create({
    alert: {
        fontSize: 14,
        lineHeight: 26,
        color: '#999'
    }
});


export default Loading;