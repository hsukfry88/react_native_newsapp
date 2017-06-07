'use strict';
import React, { Component, PropTypes} from 'react';
import { HttpUrl} from '../config/url';
import NavBar from '../components/NavBar';
import IconGroup from '../components/IconGroup';
import { StyleSheet, Text, View} from 'react-native';
import { CommonStyle} from '../config/theam';
import PullList from '../components/PullList';

class Search extends Component {
    static defaultProps = {
        selected: 0,
    };
    static propTypes = {
        selected: React.PropTypes.number,
        policy: React.PropTypes.number
    }
    constructor(props) {
        super(props);
        this.url = HttpUrl.get('Search');
    }
    paging = (policy, offset) => { //生成url
        return HttpUrl.paging({
            update: true, //开始更新数据
            url: this.url, //根路径
            length: this.props.length, //每次获取条数
            offset: offset,
            policy: policy,
        }); //政策类型
    }
    render() {
        const articalUrl = `${HttpUrl.get('PolicyDetail')}`;
        const {selected, policy, title} = this.props;
        return (
            <View style={[CommonStyle.container]}>
              <IconGroup selected={selected} router={Actions.search} actionType={'refresh'}/>
              <PullList policy={policy}  title={title}  paging={this.paging} router={Actions.SearchDetail} articalUrl={articalUrl} submit={Actions.SearchSubmitOrder}/>
              <View>
                  <NavBar selected="1"/>
              </View>       
            </View>
        )
    }
}
export default Search;