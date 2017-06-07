'use strict';

import React, { Component} from 'react';
import SelectTitle from '../../components/ListTitle/selectTitle';
import { View} from 'react-native';

class ListGroup extends Component {
    render() {
        const {dataSource} = this.props;
        const container = dataSource.map((item, i) => {
            let element;
            if (item.loginOut) {
                element = <SelectTitle key={i} title={item.title} />;
            } else {
                element = <SelectTitle key={i} title={item.title} onPress={item.onPress}/>;
            }
            return element;
        })
        return (
            <View>
                {container}
            </View>
        )
    }

}


export default ListGroup;