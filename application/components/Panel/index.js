'use strict';
import React, { Component} from 'react';
import { Text, View, WebView, StyleSheet} from 'react-native';
import { Color, theam, FS, CommonStyle} from '../../config/theam';
import { Button} from 'react-native-elements';
const Panel = ({router, position}) => {
    return (
        <View style={position}>
           <Button title='提交申报预约' buttonStyle={CommonStyle.buttonStyle} onPress={router}/>
           <View style={CommonStyle.panelContent}> 
                  <Text >申报条件咨询:</Text>
                  <Text style={CommonStyle.tel}>4000-151-756</Text>
           </View>
        </View>
    )
}
export default Panel;