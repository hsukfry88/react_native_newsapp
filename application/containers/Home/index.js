'use strict';
import React, { Component} from 'react';
import { Margin, theam, ScrollBottom, Color} from '../../config/theam';
import Banner from './banner';
import IconGroup from '../../components/IconGroup';
import Announcement from './announcement';
import HotPolicy from './hotPolicy';
import { ScrollView, View} from 'react-native';
class HomerContainer extends Component {
    render() {
        return (
            <View>
                    <Banner/>
                    <IconGroup router={Actions.SearchContainer} actionType={'reset'}/>
                    <Announcement/>
                    <HotPolicy/>
          </View>
        )
    }
}

export default HomerContainer;