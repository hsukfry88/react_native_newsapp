'use strict';

import React, {
  Component,
} from 'react';
import {
  Platform,
  BackAndroid,
  ToastAndroid
} from 'react-native';
import {
  ActionConst,
  Router,
  Scene
} from 'react-native-router-flux';
import * as CommonStyle from '../config/theam';

import Home from '../pages/Home'; /*首页*/
import Login from '../pages/Login'; /*首页*/
import Search from '../pages/Search'; /*搜索页*/
import Subscribe from '../pages/Subscribe';
import User from '../pages/User'; /*个人中心*/
import Announcement from '../pages/Announcement'; /*申报公告详情页*/
import AnnouncementList from '../pages/AnnouncementList'; /*申报公告列表页*/
import SubmitOrder from '../pages/SubmitOrder';
import PolicyDetail from '../pages/Policy_detail'; /*政策详情页*/
import SearchDetail from '../pages/SearchDetail';
import Welcome from '../pages/Welcome';
import Registered from '../pages/Registered';
import SubmitInfor from '../pages/SubmitInfor';
import SubmitAcDetail from '../pages/SubmitAcDetail';
import PolicySubmit from '../pages/Policy_submit';
import SubmitAcList from '../pages/SubmitAcList';
import Setting from '../pages/Setting';
import UserInfo from '../pages/UserInfo';
import SubmitPolicy from '../pages/SubmitPolicy';
import network from '../tool/Fetch';

import {
  HttpUrl
} from '../config/url';
import {
  dataSource
} from '../components/IconGroup/dataSource';

import {
  Actions
} from 'react-native-router-flux';

class NavScreen extends Component {
  constructor(props) {
    super(props);
    global.Fetch = network;
    global.HttpUrl = HttpUrl;
    //this.onBackAndroid = this.onBackAndroid.bind(this);
    this.startExit = this.startExit.bind(this);
  }
  startExit() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
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
  };
  render() {
    return (
      <Router>
            <Scene key="root" tabs={true} onExitApp={this.startExit()}>
                <Scene key="init" navigationBarStyle={CommonStyle.theam.navigationBar} titleStyle={{color:'#fff'}}>
                    <Scene key="Container" component={Welcome}  name="Container" hideNavBar={true}  />
                    <Scene key="Login"  component={Login} title={'登录'} schema="modal"/>
                    <Scene key="Registered"  component={Registered} title={'相关信息'} schema="modal"  />
                </Scene>
                <Scene key="main" navigationBarStyle={CommonStyle.theam.navigationBar} titleStyle={{color:'#fff'}} backButtonImage={require('../images/left_btn.png')}  >
                     <Scene key="Home"  component={Home} title={'政策百晓生'} schema="modal"/>
                    <Scene key="PolicyDetail" component={PolicyDetail}/>
                    <Scene key="Announcement" component={Announcement}/>
                    <Scene key="AnnouncementList" component={AnnouncementList}/>
                    <Scene key="MyPolicy" component={SubmitOrder} title={'申报预约'}/>
                </Scene>
                <Scene key="SearchContainer" navigationBarStyle={CommonStyle.theam.navigationBar} titleStyle={{color:'#fff'}} backButtonImage={require('../images/left_btn.png')} >
                  <Scene key="search"  titleStyle={{color:'#fff'}}  component={Search} length={15} title={dataSource[0].title} schema="modal" />
                  <Scene key="SearchDetail" titleStyle={{color:'#fff'}} backButtonImage={require('../images/left_btn.png')} component={SearchDetail}/>
                  <Scene key="SearchSubmitOrder" component={SubmitOrder} title={'申报预约'}/>
                </Scene>
                <Scene key="SubmitNav" titleStyle={{color:'#fff'}}  navigationBarStyle={CommonStyle.theam.navigationBar}backButtonImage={require('../images/left_btn.png')}>
                  <Scene key="SubmitInfor"  component={SubmitInfor} title={'申报预约'}/>
                </Scene>
                <Scene key="User"  titleStyle={{color:'#fff'}} navigationBarStyle={CommonStyle.theam.navigationBar} backButtonImage={require('../images/left_btn.png')}>
                      <Scene key="Self" name="Self" component={User} title={'个人中心'} />
                      <Scene key="Setting" name="Setting" component={Setting} title={'设置'}  />
                      <Scene key="SubmitPolicy" name="SubmitPolicy" component={SubmitPolicy}/>
                      <Scene key="UserInfo" name="UserInfo"  component={UserInfo} title={'个人信息'}  />
                  </Scene>
              </Scene>
        </Router>
    );
  }
}
/*
<Scene key="SubmitAcList" component={SubmitAcList} title={'申报公告'} />
                          <Scene  key="SubmitAcDetail" component={SubmitAcDetail}  />
*/
export default NavScreen;