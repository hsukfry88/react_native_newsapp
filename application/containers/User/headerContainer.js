'use strict';

import React, { Component} from 'react';
import { View} from 'react-native';
import Header from '../../components/HeaderBar';
class HeaderContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.UserInformation();
    }
    render() {
        const iconConfig = {
            type: 'simple-line-icon',
            name: 'settings',
            color: '#fff',
            size: 18,
            underlayColor: '#ec082e',
            onPress: this.router
        }
        return (
            <Header setting={iconConfig} {...this.state}/>
        )
    }
    UserInformation = () => {
        const User = realm.getData('User', 0, 1);
        console.log(User);
        if (User.length > 0) {
            this.setState(User[0]);
        } else {
            const user = '您还未填写用户资料';
            this.setState({
                uid: realm.getData('Login')[0].uid,
                user: user
            })
        }
    }
    router = () => {
        Actions.Set({
            title: '设置',
        })
    }
}

export default HeaderContainer;