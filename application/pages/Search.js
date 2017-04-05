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
  CommonStyle
} from '../config/theam';
import {
  PullList
} from 'react-native-pull';
import {
  dataSource
} from '../components/IconGroup/dataSource';
import Empty from '../components/empty';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ListView,
} from 'react-native';
import moment from 'moment';

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
      init: true,
      status: false,
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
        }, this.state.policyType);
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
        }, this.state.policyType);
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
  updataDataSource(dataSource) {
    if (dataSource != undefined) {
      dataSource.length > 0 ? this._data = this._data.concat(dataSource) : this.setState({
        nomore: false
      })
      this._data = this._data.concat(dataSource)
      console.log(this._data);
      this.setState({
        list: this.state.list.cloneWithRows(this._data),
        status: false
      });
    } else {
      return null;
    }
  }
  async repeatRender(newType) {
    //取消上一次的请求
    this.network.cancel();
    //清空缓存数组
    this._data.length = 0;
    this.setState({
      empty: false
    })
    if (newType != this.state.policyType) {
      await this.setState({
        policyType: newType,
        start: 0,
        init: true,
        status: false,
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
      <TouchableOpacity onPress={() =>Actions.SearchDetail({
                    id:item.id,
                    title:item.title,
                    newsTitle:item.title,
                    issuer:item.issuer,
                  })} activeOpacity={1}>
          <View style={{flexDirection: 'column',padding:10,borderBottomColor:'#eaeaea',borderBottomWidth:1,minHeight:40,backgroundColor:'#fafafa'}}>
                  <Text style={{lineHeight:20,color:'#666'}} numberOfLines={2}>{item.title}</Text>
                  <Text style={{color:'#ccc',fontSize:12,textAlign:'right'}}>{releasetime}</Text>
          </View>
      </TouchableOpacity>
    );
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

  render() {
    return (
      <View style={[CommonStyle.container,{backgroundColor:'#eaeaea'}]}>
             <View style={[styles.Container,{backgroundColor:'#fafafa',paddingLeft:4,paddingRight:4,marginTop:0}]}>
                  {
                    dataSource.map((icon,i)=><View key={i} style={styles.titleCenter} ><Icon reverse  name={icon.name} type={icon.type} color={ this.state.policyType == i+1 ? Color.gray9: icon.color } size={14} onPress={
                        ()=>{
                            Actions.search({
                              title:icon.title,
                              type:'refresh'
                            })

                            this.repeatRender(i+1)
                        }
                    } /><Text style={styles.titleStyle}>{icon.title}</Text></View>)
                  }
              </View>
              {this.state.empty? <Empty/>:<PullList
                  dataSource={this.state.list}
                  renderRow={this.renderRow}
                  pageSize={4}
                  onEndReached={this.loadMore}
                  onEndReachedThreshold={60}
                  renderFooter={this.renderFooter}
                  />}
              <View>
                  <Nav selected="1"/>
              </View>       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  fs: {
    fontSize: 10,
  },
  titleCenter: {
    flex: 1,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    color: Color.gray3,
    fontSize: FS.fs12
  },
  buttonStyle: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#ec082e'
  },
});

export default search;