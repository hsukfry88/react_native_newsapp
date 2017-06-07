import React, { Component} from 'react';
import { View} from 'react-native';
import NavBar from '../components/NavBar';
import { Actions} from 'react-native-router-flux';
import { CommonStyle} from '../config/theam';
import PullList from '../components/PullList';

export default class extends Component {
    paging = (policy, offset) => { //生成url
        const {listUrl, length} = this.props
        //console.log(listUrl);
        return HttpUrl.paging({
            update: true, //开始更新数据
            url: listUrl, //根路径
            length: length, //每次获取条数
            offset: offset,
        });
    }
    render() {
        console.log(this.props);

        const {articalUrl, title, submit, policy} = this.props;
        return (
            <View style={[CommonStyle.container]}>
                <PullList policy={policy} paging={this.paging} title={title} router={Actions.Announcement} articalUrl={articalUrl} submit={Actions.MyPolicy} articalType={'apply'}/>
                <View>
                  <NavBar selected="0"/>
                </View>
            </View>
            );
    }
}