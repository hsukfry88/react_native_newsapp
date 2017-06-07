'use strict';

import React, { Component} from 'react';
import { View, Text, Image, StatusBar} from 'react-native';
import { Actions} from 'react-native-router-flux';
import { CommonStyle} from '../../config/theam';

class container extends Component {
    constructor(props) {
        super(props);
        this.getDate();
    }
    render() {
        return (
            <View style={CommonStyle.welcome}>
                <StatusBar hidden={true}/>
                <Image style={{
                resizeMode: Image.resizeMode.contain,
                height: screenHeight,
                width: screenWidth
            }}  source={require('../../images/home.jpg')}/>
            </View>
        )
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    getDate = async() => {
        try {
            //请求成功时，保存本地数据库
            const response = await fetch(HttpUrl.get('Home'));
            const responseData = await response.json();
            console.log(responseData);
            this.saveData(responseData);
            this.init();
        } catch ( error ) {
            //当请求失败时
            await this.init();
        }
    }
    saveData = (responseData) => {
        const DataList = [{
            data: 'Announcement'
        }, {
            banner: 'Banner'
        }, {
            hotPolicy: 'HotPolicy'
        }]
        DataList.map((item) => {
            let key = Object.keys(item)[0];
            let table = Object.values(item)[0];
            realm.updatesData(table, responseData[key]);
        });
    }
    init = () => {
        const me = this;
        this.timer = setTimeout(
            () => {
                me.jumpPage();
            },
            3000
        );
    }
    jumpPage = () => {
        const status = realm.getData('Login');
        console.log(status);
        if (status.length > 0) {
            Actions.main({
                type: 'reset'
            });
        } else {
            Actions.Login({
                type: 'replace'
            });
        }
    }
}
export default container;