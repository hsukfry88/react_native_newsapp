'use strict';
import React, { Component} from 'react';
import Banner from '../../components/Banner';
class banner extends Component {
    render() {
        const data = realm.getData('Banner');
        return (
            <Banner dataSource={data}/>
        )
    }
}
export default banner;