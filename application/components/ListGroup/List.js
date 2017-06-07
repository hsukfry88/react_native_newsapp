'use strict';
import { StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import React, { Component} from 'react';
import ItemContainer from '../../containers/ItemContainer';
class List extends Component {
    render() {
        const {dataSource, detail, articalUrl, title, submit, articalType} = this.props;
        const mapList = dataSource.map((item, i) => {
            const {id} = item;
            const url = `${articalUrl}/${id}`;
            const param = {
                id: id,
                title: title,
                url: url,
                submit: submit,
                policy: item.title,
                articalType: articalType
            };
            const router = () => {
                detail(param);
            }
            return (
                <View key={i}>
                    <ItemContainer  title={item.title} line={2} key={i} router={router} articalUrl={url}/>
                </View>
            )
        })
        return (
            <View>{mapList}</View>
        )
    }
}

export default List;