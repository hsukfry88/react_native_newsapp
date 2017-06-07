'use strict';

import React, { Component} from 'react';
import { View} from 'react-native';
import HeaderContainer from './headerContainer';
import ListGroup from './ListGroup';

class mainContainer extends Component {
    render() {
        return (
            <View>
                <HeaderContainer/>
                <ListGroup/>
            </View>
        )
    }
}

export default mainContainer;