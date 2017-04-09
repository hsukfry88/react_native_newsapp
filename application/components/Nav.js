'use strict';

import React, { Component} from 'react';
import { StyleSheet, Text, View,
} from 'react-native';
import { theam, FS} from '../config/theam';
import { Icon, Tabs, Tab} from 'react-native-elements';
import { Actions} from 'react-native-router-flux';

class Nav extends Component {
    jumpPage() {}
    render() {
        const IconSize = 18;
        const items = [{
            title: '首页',
            type: 'font-awesome',
            component: Actions.main,
            name: 'home',
        }, {
            title: '政策查询',
            type: 'simple-line-icon',
            component: Actions.SearchContainer,
            name: 'magnifier',
        }, {
            title: '申报预约',
            type: 'font-awesome',
            component: Actions.SubmitNav,
            name: 'pencil',
        }, {
            title: '个人中心',
            type: 'font-awesome',
            component: Actions.User,
            name: 'user',
        }]
        return (
            <Tabs tabBarStyle={styles.tabBarStyle} >
        {items.map((item, i) => {
                return <Tab key={i} title={item.title}  renderIcon={() => <Icon type={item.type} name={item.name} iconStyle={this.props.selected == i ? styles.selected : styles.iconStyle} size={IconSize} />
                    }
                    titleStyle={[styles.titleStyle, this.props.selected == i ? styles.selected : '']}
                    onPress={() => {
                        item.component({
                            type: 'replace'
                        })
                    }}></Tab>
            })}
      </Tabs>
            );
    }
}

const styles = StyleSheet.create({
    iconStyle: {
        color: theam.NavIcon
    },
    selected: {
        color: 'red',
    },
    titleStyle: {
        fontSize: FS.fs12,
        color: theam.NavText,
    },
    tabBarStyle: {
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default Nav;