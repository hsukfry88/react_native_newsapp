'use strict';
import React, { Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Color, CommonStyle} from '../../config/theam';
import { Icon} from 'react-native-elements';
import { connect} from 'react-redux';
import { selectInfor} from '../../actions';

class Item extends Component {
    render() {
        const {line, selectedShare, articalUrl, title, router} = this.props;
        const param = {
            title: title,
            url: `${articalUrl}`
        };
        const callback = () => {
            selectedShare(param.title, param.url);
            router(param);
        }
        return (
            <View style={CommonStyle.Item}>   
                <TouchableOpacity onPress={callback}>
                    <View style={CommonStyle.ItemContainer}>
                        <View style={CommonStyle.ItemContent}>
                            <Text numberOfLines={line} style={CommonStyle.ItemTitle}>{title}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Item;