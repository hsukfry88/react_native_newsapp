'use strict';

import React, {
  Component
} from 'react';
import Nav from '../components/Nav';
import {
  theam,
  Margin
} from '../config/theam';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import {
  Icon
} from 'react-native-elements';
import {
  Actions
} from 'react-native-router-flux';
import localServer from '../config/domain';
import ListItem from '../components/ListItem';


class user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: realm.getData('Login')[0].uid,
      order: '',
      username: this.props.username,
      company: this.props.company,
      dataSource: []
    };
    this.getUserInfor = this.getUserInfor.bind(this);
    this.updateDataSource = this.updateDataSource.bind(this);
  }
  async componentDidMount() {
    this.getUserInfor();
    this.updateDataSource();
  }
  async postFetch() {
    const me = this;
    try {
      const http = `${localServer.name}/getStarDeclare/${me.state.uid}`;
      console.log(http);
      let response = await fetch(http);
      let responseData = await response.json();
      const result = await responseData.data;
      return result;
    } catch (error) {
      console.error(error)
    }
  }
  getUserInfor() {
    const User = realm.getData('User', 0, 1);
    if (User.length > 0) {
      this.setState({
        username: User[0].name,
        company: User[0].company
      })
    } else {
      this.setState({
        username: '',
        company: ''
      })
    }
    console.log(this.state.uid);
  }
  async updateDataSource() {
    let data = realm.getData('StartPolicy', 0, 10);
    if (data.length > 0) {
      this.setState({
        order: data.length,
        dataSource: data
      })
    } else {
      let result = await this.postFetch();
      this.setState({
        order: result.length,
        dataSource: result
      })
      realm.deletSchema('StartPolicy');
      realm.updatesData('StartPolicy', result);
    }

  }

  render() {
    return (
      <View style={styles.bgGray}>
        <View style={styles.container}>
            <View style={styles.box}>
                <View>
                    <Text style={styles.boxTitle}>{this.state.username?this.state.username:'您还未设置个人信息'}</Text>
                </View>
                <View>
                <Icon style={styles.boxTitle} type='simple-line-icon' name='settings' color='#fff' size={18} underlayColor={'#ec082e'} onPress={()=>{
                    Actions.Setting({
                      title:'设置'
                    })
                  }} />
                </View>
            </View>
            <View>
                <Text style={styles.companyTxt}>{this.state.company?this.state.company:''}</Text>
            </View>
        </View>

        <View style={styles.box_bd}>
          <View style={styles.row}>
              <Icon type='simple-line-icon' iconStyle={{marginRight:5}} name='event' color='#01a6e8' size={20} />
              <Text style={{marginRight:5}}>我的申报预约</Text>
              <Text>{this.state.order}</Text>
          </View>
        </View>
        <View style={{backgroundColor:'white'}}>
        {
            this.state.dataSource.map((item,i)=>{
              console.log(item);
              return (
                <ListItem title={item.policytitle} key={i} line={2} onPress={()=>{Actions.SubmitPolicy({title:item.policytitle,id:item.policyid,articalType:item.articaltype})}} />
              )
            })
        }
        </View>
        <Nav selected="3"/>
      </View>
    );
  }
}

/*
          <ScrollView style={styles.ScrollViewWarp}>
          <View style={styles.title}>
              <Text style={{color:'#999'}}>我的申报预约</Text>
              <Text style={{color:'#999'}}>查看全部记录></Text>
          </View>
        </ScrollView>
            <View style={styles.row}>
              <Icon type='simple-line-icon' iconStyle={{marginRight:5}} name='settings' color='#f8ac1a' size={20}/>
              <Text style={{marginRight:5}}>我的收藏</Text>
              <Text>{this.state.starts}</Text>
          </View>
  <View>
    <View style={styles.title}>
        <Text style={{color:'#999'}}>我的收藏</Text>
        <Text style={{color:'#999'}}>查看全部记录></Text>
    </View>           
  </View>
*/


const styles = StyleSheet.create({
  bgGray: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },
  container: {

    marginTop: 45,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#ec082e',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  box_bd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 7,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: .5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  boxTitle: {
    color: '#fff',
  },
  companyTxt: {
    color: '#fff',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  },
  row: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  ScrollViewWarp: {
    marginTop: 5
  },
  title: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: .5,
    borderBottomWidth: .5,
    borderColor: '#eaeaea',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  red: {
    color: '#ec082e',
  }
});


export default user;