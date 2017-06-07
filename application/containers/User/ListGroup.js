'use strict';
import React, { Component} from 'react';
import { View} from 'react-native';
import { ListGroup} from '../../config/theam';
import SelectTitle from '../../components/ListTitle/selectTitle';
import { Actions} from 'react-native-router-flux';

class List extends Component {
    render() {
        const List = [{
            title: '我的申报预约',
            onPress: this.DeclareList
        }, {
            title: '我的收藏',
        }, {
            title: '关于百晓生'
        }]
        const container = List.map((item, i) => <SelectTitle key={i} title={item.title} onPress={item.onPress}/>)
        return (
            <View style={ListGroup.container}>
                    {container}
            </View>
        )
    }
    DeclareList = () => {
        Actions.DeclareList()
    }
}
export default List;