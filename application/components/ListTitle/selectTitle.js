'use strict';

import React, { Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { Icon} from 'react-native-elements';
import { SelectTitle} from '../../config/theam';
class SelectItem extends Component {
    render() {
        const {setting, line, onPress, title} = this.props;
        return (

            <View style={SelectTitle.container} >
                <TouchableOpacity  onPress={onPress} underlayColor = {'#fff'} style={SelectTitle.wrapper} >
                        <View style={SelectTitle.titleSubtitleContainer}>
                                <Text style={SelectTitle.title} numberOfLines={line}>{title}</Text>
                        </View>
                        <View style={SelectTitle.chevronContainer}>
                              <Icon setting={setting} type={SelectTitle.iconType} size={SelectTitle.iconSize} name={SelectTitle.iconName} color={SelectTitle.iconColor}/>
                        </View>
                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    bgGray: {
        flex: 1,
        backgroundColor: '#eeeeee'
    },
    container: {
        marginTop: 50,
        paddingTop: 20,
        paddingBottom: 20,
    },
    red: {
        color: '#ec082e',
    },
    buttonStyle: {
        borderWidth: .5,
        borderColor: '#ccc',
        backgroundColor: '#fff'
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
    },
    row: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    rowTitle: {
        flex: 1,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 5,
        flex: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
    modalButton: {
        marginTop: 10,
    },
    modalHeader: {
        //flex: 1,
        marginBottom: 20,
    },
    modalBottm: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    makeSure: {
        marginRight: 20,
    },
    modalContainer: {
        height: 125,
        width: 250,
        borderRadius: 4,
        padding: 14,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    modalHeaderText: {
        textAlign: 'left',
    },
    text: {
        color: '#666'
    },
});

/*
    style={[SelectTitle.container, containerStyle && containerStyle]}
 style={{
                fontSize: 13 || normalize(13),
                color: '#333'
            }}

 type={'simple-line-icon'}
            iconStyle={[SelectTitle.chevron]}
            size={12}
            name={ 'arrow-right'}
            color={'#bdc6cf'}

 SelectTitle = SelectTitleheet.create({
    container: {
        paddingLeft: 7,
        paddingTop: 10,
        paddingRight: 7,
        paddingBottom: 10,
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        backgroundColor: 'transparent'
    },
    //chevronColor: '#bdc6cf',
    wrapper: {
        flexDirection: 'row',
        marginLeft: 7,
    },
    titleSubtitleContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    chevronContainer: {
        flex: 0.05,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    rightTitleContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    rightTitleStyle: {
        marginRight: 5,
        color: '#bdc6cf'
    },
    chevron: {}
});           

 */
export default SelectItem;