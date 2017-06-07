import React, { Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
const RefershFooter = ({containerStyle, textStyle, content}) => {
    return (
        <View style={containerStyle}>
            <Text style={textStyle}>{content}</Text>
        </View>
    )
}
export default RefershFooter;