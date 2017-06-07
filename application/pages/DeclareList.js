'use strict';

import React, { Component} from 'react';
import { View, Text} from 'react-native';
import { CommonStyle} from '../config/theam';

class DeclareList extends Component {
    render() {
        return (
            <View style={CommonStyle.container2}>
    					<Text>收藏列表</Text>
    			</View>
        )
    }
}

export default DeclareList;