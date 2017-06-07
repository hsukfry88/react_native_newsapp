'use strict';

import React, { Component} from 'react';
import { StyleSheet, Text, View,
} from 'react-native';
import { theam, CommonStyle} from '../../config/theam';
import { Tabs, Icon, Tab} from 'react-native-elements';
import dataSource from './dataSource';
import { Actions} from 'react-native-router-flux';

const NavBar = ({selected}) => {
    const routerList = [{
        router: Actions.main
    }, {
        router: Actions.SearchContainer
    }, {
        router: Actions.SubmitNav
    }, {
        router: Actions.User
    }]
    const content = dataSource.tab.map((data, i) => {
        data.iconStyle = selected == i ? theam.tabSelected : theam.tabIcon;
        data.titleStyle = selected == i ? theam.textSelected : theam.tabText;
        return (
            <Tab key={i} size={CommonStyle.IconSize}
            renderIcon={() => <Icon  size={18} {...data} />
            }
            onPress = {
            () => routerList[i].router({
                type: 'replace'
            })
            } {...data
            }
            />
        )
    })
    return (
        <Tabs tabBarStyle={CommonStyle.contentCenter}>
            {content}
        </Tabs>
    )
}
export default NavBar;