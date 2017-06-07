'use strict';

import React, { Component, propTypes} from 'react';
import { StyleSheet, View, ListView} from 'react-native';
import { Color, FS, theam, CommonStyle} from '../../config/theam';
import { PullList} from 'react-native-pull';
import ListItem from '../../containers/ItemContainer';
import moment from 'moment';
import RefershFooter from '../refershFooter';
import { connect} from 'react-redux';
import { selectInfor} from '../../actions';
import ItemContainer from '../../containers/ItemContainer';

class PullListWarp extends Component {
    static defaultProps = {
        policy: 1,
        length: 15,
        start: 0,
    };
    static propTypes = {
        start: React.PropTypes.number,
        length: React.PropTypes.number,
        policy: React.PropTypes.number,
    }
    constructor(props) {
        super(props);
        this.state = {
            offset: this.props.start,
            update: true,
            policy: this.props.policy,
            list: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })
        }
        this._data = [];
        this.http = '';
        this.network;
    }
    componentWillReceiveProps(nextProps) {
        //取消上一次的请求
        this.network.cancel();
        //清空缓存数组
        this._data.length = 0;
        if (this.props.policy != nextProps.policy) {
            this.setState({
                offset: this.props.start,
                list: new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                })
            })
            this.getData(nextProps.policy, this.props.start)
        } else {
            return null;
        }
    }
    render() {
        return (
            <PullList style={theam.PullList}
            dataSource={this.state.list}
            renderRow={this.renderRow}
            pageSize={4}
            onEndReached={this.loadMore}
            onEndReachedThreshold={60}
            renderFooter={this.renderFooter}
            />
        )
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
    getData = async(policy, offset) => {
        this.http = this.props.paging(policy, offset);
        //console.log(this.http);
        this.network = Fetch(this.http); //绑定全局网络请求
        const result = await this.postHttp();
        //console.log(result);
        await this.updataDataSource(result);
    }
    //发送网络请求
    async postHttp() {
        const result = await this.network.postFetch();
        // console.log(result);
        return result == undefined ? null : result.data;
    }
    //加载更多
    loadMore = () => {
        //重复请求处理
        if (this.state.update) {
            this.getData(this.props.policy, this.state.offset);
        } else {
            return null;
        }
    }
    //更新数据
    updataDataSource = (dataSource) => {
        if (dataSource != undefined) {
            //判断dataSource长度
            dataSource.length > 0 ? this._data = this._data.concat(dataSource) : this.setState({
                update: false
            });
            this.setState({
                list: this.state.list.cloneWithRows(this._data),
                offset: this.state.offset + this.props.length
            });
        } else {
            return null;
        }
    }
    renderRow = (item, sectionID, rowID, highlightRow) => {
        let releasetime;
        const {id, title} = item;
        if (item.startdate) {
            releasetime = this.TimeFormat(item.startdate, 'YYYY-MM-DD');
        } else {
            releasetime = this.TimeFormat(item.releasetime, 'YYYY-MM-DD');
        }
        return (
            <ItemContainer title={item.title} line={2}  creatertime={releasetime}
            router={() => {
                this.router(id, title)
            }}/>
        )
    }
    /**
     * [description]
     * @return {[type]} [description]
     */
    renderFooter = () => {
        if (this.state.update) {
            return (
                <RefershFooter content={'加载中请稍后'} containerStyle={CommonStyle.refershContainer} textStyle={CommonStyle.refershText}/>
                );
        } else {
            return (
                <RefershFooter content={'没有更多了'} containerStyle={CommonStyle.refershContainer} textStyle={CommonStyle.refershText}/>
                );
        }
    }
    router = (id, newsTitle) => {
        const {selectedShare, articalUrl, title, router, submit, articalType, policy} = this.props;
        //console.log(this.props);
        const url = `${articalUrl}/${id}`;
        const param = {
            id: id,
            title: title,
            url: url,
            submit: submit
        };
        selectedShare(newsTitle, param.url);
        router({
            title: title,
            url: url,
            submit: submit,
            policy: newsTitle,
            articalType: articalType
        })
    }
}
const mapStateToProps = (state) => {
    return {
        selectedShareInfor: state.selectedShareInfor
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        selectedShare: (id, title) => {
            dispatch(selectInfor(id, title));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PullListWarp);