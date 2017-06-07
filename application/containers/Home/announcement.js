'use strict';
import React, { Component} from 'react';
import ListGroup from '../../components/ListGroup';
class Announcement extends Component {
    render() {
        const data = realm.getData('Announcement');
        const Announcement = `${HttpUrl.get('Announcement')}`;
        const AnnouncementList = `${HttpUrl.get('AnnouncementList')}`;
        return (
            <ListGroup title={'申报公告'} dataSource={data} router={Actions.AnnouncementList} detail={Actions.Announcement} articalUrl={Announcement} listUrl={AnnouncementList} length={15} articalType={'apply'}/>
        )
    }
}
export default Announcement;