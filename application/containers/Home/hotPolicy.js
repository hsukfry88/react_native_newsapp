'use strict';

import React, { Component} from 'react';
import ListGroup from '../../components/ListGroup';
class HotPolicy extends Component {
    render() {
        const data = realm.getData('Announcement');
        const PolicyDetail = `${HttpUrl.get('PolicyDetail')}`; //政策url
        const AnnouncementList = `${HttpUrl.get('AnnouncementList')}`; //公告列表url
        return (
            <ListGroup title={'热门申报'} dataSource={data} router={Actions.AnnouncementList} detail={Actions.PolicyDetail} articalUrl={PolicyDetail} listUrl={AnnouncementList} length={15}/>
        )
    }
}
export default HotPolicy;