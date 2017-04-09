'use strict';
import React, {
  Component
} from 'react';
import localServer from '../config/domain';
import Nav from '../components/Nav';
import IconGroup from '../components/IconGroup';
import {
  Actions
} from 'react-native-router-flux';
import {
  Icon,
  SocialIcon,
  List
} from 'react-native-elements';
import {
  Color,
  FS,
  theam,
  CommonStyle
} from '../config/theam';
import {
  PullList
} from 'react-native-pull';
import {
  dataSource
} from '../components/IconGroup/dataSource';
import Empty from '../components/empty';
import ListItem from '../components/ListItem';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ListView,
} from 'react-native';
import moment from 'moment';
import RefershFooter from '../components/refershFooter';

class search extends Component {

  static defaultProps = {
    length: 15,
  }
  constructor(props) {
    super(props);
    let initTpye = this.props.policyType != null ? this.props.policyType : 1;
    this.state = {
      start: 0,
      policyType: initTpye,
      update: false,
      nomore: false,
      length: 15,
      list: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
    this._data = [];
    this.http = '';
    this.url = HttpUrl.get('Search');
    this.network;
    this.renderRow = this.renderRow.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.repeatRender = this.repeatRender.bind(this);
    this.updataDataSource = this.updataDataSource.bind(this);
    this.getData = this.getData.bind(this);
    this.paging = this.paging.bind(this);
  }
  componentWillUnmount() {
    this._data.length = 0;
    this.setState({
      list: null
    })
    this.network.cancel();
  }
  TimeFormat(time, format) {
    let result = moment(time, format).format().split('T');
    return result[0];
  }
  paging() { //生成url
    return HttpUrl.paging({
      update: true, //开始更新数据
      url: this.url, //根路径
      length: this.props.length, //每次获取条数
      start: this.state.start //起始位置
    }, this.state.policyType); //政策类型
  }
  async getData() {
      console.log(this.state.start);
      this.http = this.paging();
      //console.log(this.http);
      this.network = Fetch(this.http); //绑定全局网络请求
      const result = await this.postHttp();
      this.updataDataSource(result);
    }
    //发送网络请求
  async postHttp() {
      const result = await this.network.postFetch();
      console.log(result);
      return result == undefined ? null : result.data;
    }
    //加载更多
  loadMore() {
      //重复请求处理
      let update = this.state.update;
      let nomore = this.state.nomore;
      if (!update && !nomore) {
        this.getData();
      } else {
        return null;
      }
    }
    //更新数据
  updataDataSource(dataSource) {
    if (dataSource != undefined) {
      let update = false;
      //判断dataSource长度
      dataSource.length > 0 ? this._data = this._data.concat(dataSource) : update = true;
      this.setState({
        list: this.state.list.cloneWithRows(this._data),
        update: false,
        start: this.state.start + this.props.length,
        nomore: update,
      });
    } else {
      return null;
    }
  }
  repeatRender(newType) {
    //取消上一次的请求
    this.network.cancel();
    //清空缓存数组
    this._data.length = 0;
    if (newType != this.state.policyType) {
      this.setState({
        policyType: newType,
        start: 0,
        update: false,
        nomore: false,
        list: new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        })
      });
      this.getData();
    } else {
      return null;
    }
  }

  renderRow(item, sectionID, rowID, highlightRow) {
      const releasetime = this.TimeFormat(item.releasetime, 'YYYY-MM-DD');
      return (
        <ListItem title={item.title} line={2}  creatertime={releasetime}   onPress = {() => Actions.Announcement({
                      id: item.id,
                      title: item.title
            })}/>
      )
    }
    /*footer*/
  renderFooter() {
    if (this.state.nomore) {
      return (
        <RefershFooter content={'没有更多了'} containerStyle={CommonStyle.refershContainer} textStyle={CommonStyle.refershText}/>
      );
    } else {
      return (
        <RefershFooter content={'加载中请稍后'} containerStyle={CommonStyle.refershContainer} textStyle={CommonStyle.refershText}/>
      );
    }
  }

  render() {
    return (
      <View style={[CommonStyle.container]}>
             <View style={theam.IconWarp}>
                  {
                    dataSource.map((icon,i)=><View key={i} style={theam.SearchIconStyle} ><Icon reverse  name={icon.name} type={icon.type} color={ this.state.policyType == i+1 ? Color.gray9: icon.color } size={FS.fs14} onPress={
                        ()=>{
                            Actions.search({
                              title:icon.title,
                              type:'refresh'
                            })
                            this.repeatRender(i+1)
                        }
                    } /><Text style={theam.SearchIconTitle}>{icon.title}</Text></View>)
                  }
              </View>
              <PullList
                  dataSource={this.state.list}
                  renderRow={this.renderRow}
                  pageSize={4}
                  onEndReached={this.loadMore}
                  onEndReachedThreshold={60}
                  renderFooter={this.renderFooter}
                  />
              <View>
                  <Nav selected="1"/>
              </View>       
      </View>
    )
  }
}
export default search;