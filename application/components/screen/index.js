'use strict';

import React, { Component,
} from 'react';
import { Platform, BackAndroid, ToastAndroid, Image, TouchableOpacity} from 'react-native';
import { ActionConst, Router, Scene} from 'react-native-router-flux';
import { CommonStyle, theam} from '../../config/theam';
import { shareImg, HttpUrl} from '../../config/url';
import Home from '../../pages/Home'; /*首页*/
import Login from '../../pages/Login'; /*登陆*/
import Search from '../../pages/Search'; /*搜索页*/
import User from '../../pages/User'; /*个人中心*/
import AnnouncementList from '../../pages/AnnouncementList'; /*申报公告列表页*/
import Artical from '../../pages/Artical'; /*内容详情页*/
import Welcome from '../../pages/Welcome'; /*欢迎页面*/
import Registered from '../../pages/Registered';
import SubmitInfor from '../../pages/SubmitInfor';
import Setting from '../../pages/Setting';
import UserInfo from '../../pages/UserInfo';
import DeclareList from '../../pages/DeclareList';
import network from '../../tool/Fetch';
import { dataSource} from '../IconGroup/dataSource';
import { Actions} from 'react-native-router-flux';
import { connect} from 'react-redux';

class ScreenRouter extends Component {
    componentDidMount() {
        global.Fetch = network;
        global.HttpUrl = HttpUrl;
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    startExit = () => {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', 500);
        return true;
    }
    _onPressShare = (title, content, url) => {
        console.log(this.props);
    // console.log(`${title}`, `${content}`, `${url}`, `${shareImg}`);
    //MobLogin.showShare(`${title}`, `${content}`, `${url}`, `${shareImg}`)
    }
    _renderRightButton = () => {
        return (
            <TouchableOpacity onPress={this._onPressShare}>
                <Image source={require('../../images/share.png')} style={CommonStyle.rightButton}/>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <Router>
                    <Scene key="root" tabs={true} onExitApp={this.startExit()} >
                        <Scene key="init" navigationBarStyle={theam.navigationBar} titleStyle={CommonStyle.headerTitle}>
                            <Scene key="Container" component={Welcome}  name="Container" hideNavBar={true}  />
                            <Scene key="Login"  component={Login} title={'登录'} schema="modal"/>
                            <Scene key="Registered"  component={Registered} title={'相关信息'} schema="modal"  />
                        </Scene>
                        <Scene key="main" navigationBarStyle={theam.navigationBar} titleStyle={CommonStyle.headerTitle} backButtonImage={require('../../images/left_btn.png')}>
                             <Scene key="Home"  component={Home} title={'政策百晓生'} schema="modal"/>
                            <Scene key="PolicyDetail" component={Artical} renderRightButton={this._renderRightButton}/>
                            <Scene key="Announcement" component={Artical} renderRightButton={this._renderRightButton}/>
                            <Scene key="AnnouncementList" component={AnnouncementList}/>
                            <Scene key="MyPolicy" component={SubmitInfor} title={'申报预约'}/>
                        </Scene>
                        <Scene key="SearchContainer" navigationBarStyle={theam.navigationBar} titleStyle={CommonStyle.headerTitle} backButtonImage={require('../../images/left_btn.png')}  >
                          <Scene key="search"  titleStyle={CommonStyle.headerTitle}  component={Search} length={15} title={dataSource[0].title} schema="modal" />
                          <Scene key="SearchDetail" titleStyle={CommonStyle.headerTitle} component={Artical} renderRightButton={this._renderRightButton}/>
                          <Scene key="SearchSubmitOrder" component={SubmitInfor} title={'申报预约'}/>
                        </Scene>
                        <Scene key="SubmitNav" titleStyle={CommonStyle.headerTitle}  navigationBarStyle={theam.navigationBar} backButtonImage={require('../../images/left_btn.png')}>
                          <Scene key="SubmitInfor"  component={SubmitInfor} title={'申报预约'}/>
                        </Scene>
                        <Scene key="User"  titleStyle={CommonStyle.headerTitle} navigationBarStyle={theam.navigationBar} backButtonImage={require('../../images/left_btn.png')}>
                              <Scene key="Self" name="Self" component={User} title={'个人中心'} />
                              <Scene key="Set" name="Set" component={Setting} title={'设置'}  />
                              <Scene key="DeclareList" name="DeclareList" component={DeclareList} title={'我的预约申报'} />
                              <Scene key="UserInfo" name="UserInfo"  component={UserInfo} title={'个人信息'}  />
                          </Scene>
                      </Scene>
                </Router>
            );
    }
}
/*
<Scene key="SubmitPolicy" name="SubmitPolicy" component={SubmitPolicy}/>

 */

const RouterWithRedux = connect((state) => state)(ScreenRouter);
export default RouterWithRedux;