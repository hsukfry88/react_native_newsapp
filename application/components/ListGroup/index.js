/*申报公告*/
'use strict';
import React, { Component} from 'react';
import { StyleSheet, Text, View,
} from 'react-native';
import { Actions} from 'react-native-router-flux';
import ListTitle from '../ListTitle';
import { Color, CommonStyle} from '../../config/theam';
import List from './List';

class ListGroup extends Component {
    render() {
        const props = this.props;
        const {router, title} = this.props;
        return (
            <View>
                <ListTitle title={title} router={() => router(props)}/>
                <View style={CommonStyle.listWarp}>
                    <List {...this.props} submit={Actions.MyPolicy}/>
                </View>
            </View>
        )
    }
}
export default ListGroup;