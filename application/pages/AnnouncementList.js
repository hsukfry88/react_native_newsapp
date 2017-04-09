import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ListView,
} from 'react-native';
import Nav from '../components/Nav';
import ListItem from '../components/ListItem';
import {
  HttpUrl
} from '../config/url';
import {
  Actions
} from 'react-native-router-flux';
import {
  CommonStyle
} from '../config/theam';
import {
  PullList
} from 'react-native-pull';
import localServer from '../config/domain';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      init: true,
      status: false,
      nomore: false,
      list: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
    };
    this._data = [];
    this.http = '';
    this.url = HttpUrl.get('AnnouncementList');
    this.renderRow = this.renderRow.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.topIndicatorRender = this.topIndicatorRender.bind(this);
  }
  componentWillUnmount() {
      this._data.length = 0;
      this.setState({
        list: null
      })
      this.network.cancel();
    }
    //初始化url
  async getData() {
      if (this.state.init) {
        this.setState({
          init: false,
          status: true
        });
        this.http = HttpUrl.paging({
          url: this.url,
          length: this.props.length,
          start: 0
        });
        console.log(this.http);
        this.network = Fetch(this.http);
      } else {
        this.setState({
          start: this.state.start + this.props.length
        })
        this.http = HttpUrl.paging({
          url: this.url,
          length: this.props.length,
          start: this.state.start
        });
        console.log(this.http);
        this.network = Fetch(this.http);
      }
      const result = await this.postHttp();
      this.updataDataSource(result);
    }
    //发送网络请求
  async postHttp() {
    const result = await this.network.postFetch();
    console.log(result);
    return result == undefined ? null : result.data;
  }
  updataDataSource(dataSource) {
      if (dataSource != undefined) {
        dataSource.length > 0 ? this._data = this._data.concat(dataSource) : this.setState({
          nomore: true
        })
        console.log(this._data);
        this.setState({
          list: this.state.list.cloneWithRows(this._data),
          status: false
        });
      } else {
        return null;
      }
    }
    /*onPullRelease: 处于pullrelease状态时执行的方法*/
  onPullRelease(resolve) {
      //do something
      setTimeout(() => {
        resolve();
      }, 3000);
    }
    /*顶部开始刷新时的方法*/
  topIndicatorRender(pulling, pullok, pullrelease) {
    const hide = {
      position: 'absolute',
      left: -10000
    };
    const show = {
      position: 'relative',
      left: 0
    };
    setTimeout(() => {
      if (pulling) {
        this.txtPulling && this.txtPulling.setNativeProps({
          style: show
        });
        this.txtPullok && this.txtPullok.setNativeProps({
          style: hide
        });
        this.txtPullrelease && this.txtPullrelease.setNativeProps({
          style: hide
        });
      } else if (pullok) {
        this.txtPulling && this.txtPulling.setNativeProps({
          style: hide
        });
        this.txtPullok && this.txtPullok.setNativeProps({
          style: show
        });
        this.txtPullrelease && this.txtPullrelease.setNativeProps({
          style: hide
        });
      } else if (pullrelease) {
        this.txtPulling && this.txtPulling.setNativeProps({
          style: hide
        });
        this.txtPullok && this.txtPullok.setNativeProps({
          style: hide
        });
        this.txtPullrelease && this.txtPullrelease.setNativeProps({
          style: show
        });
      }
    }, 1);
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                <ActivityIndicator size="small" color="gray" />
                <Text ref={(c) => {this.txtPulling = c;}}>当前PullList状态: 加载中请稍后...</Text>
                <Text ref={(c) => {this.txtPullok = c;}}>当前PullList状态: ......</Text>
                <Text ref={(c) => {this.txtPullrelease = c;}}>当前PullList状态: 请耐心等待......</Text>
    		</View>
    );
  }

  render() {
    return (
      <View style={[CommonStyle.container]}>
              <PullList
                  style={{}}
                  onPullRelease={this.onPullRelease} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60}
                  dataSource={this.state.list}
                  renderRow={this.renderRow}
                  onEndReached={this.loadMore}
                  onEndReachedThreshold={60}
                  renderFooter={this.renderFooter}
                  />
                <View>
                  <Nav selected="0"/>
                </View>
      </View>
    );
  }
  renderRow(item, sectionID, rowID, highlightRow) {
    let createtime = item.startdate.split('T')[0];
    return (
      <ListItem title={item.title} line={2}  creatertime={createtime}   onPress = {
                    () => Actions.Announcement({
                      id: item.id,
                      title: item.title
                    })
      }/>
    )
  }

  /*footer*/
  renderFooter() {
    if (this.state.nomore) {
      return (
        <View style={{height:40,flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#eaeaea',marginBottom:45}}>
            <Text style={{fontSize:13,paddingLeft:5,color:'#666'}}>没有更多了</Text>
        </View>
      );
    } else {
      return (
        <View style={{height:40,flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#eaeaea',marginBottom:45}}>
            <ActivityIndicator color={'#999'}/>
            <Text style={{fontSize:13,paddingLeft:5,color:'#666'}}>加载中请稍后</Text>
        </View>
      );
    }
  }
  loadMore() {
    //重复请求处理
    let status = this.state.status;
    let nomore = this.state.nomore;
    if (!status && !nomore) {
      this.getData();
    } else {
      return null;
    }
  }

}