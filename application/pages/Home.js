'use strict';
import localServer from '../config/domain';
import React, {
  Component
} from 'react';
import {
  Margin,
  theam,
  ScrollBottom,
  Color
} from '../config/theam';
import Nav from '../components/Nav';
import Banner from '../components/Banner';
import IconGroup from '../components/IconGroup';
import AnnouncementList from '../components/List/Announcement';
import DeclareList from '../components/List/Declare';
import {
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: realm.getData('Banner'),
      announcement: realm.getData('Announcement'),
      hotPolicy: realm.getData('HotPolicy')
    };
  }
  componentWillUnmount() {
    this.setState({
      banner: null,
      announcement: null,
      hotPolicy: null
    })
  }
  render() {
    return (
      <View style={[theam.Container,{backgroundColor:Color.graye}]}>
          <ScrollView style={[ScrollBottom.bottom40]}>
            <Banner dataSource={this.state.banner}/>
            <IconGroup/>
            <AnnouncementList listTitle={'申报公告'} dataSource={this.state.announcement}/>
            <DeclareList listTitle={'热门申报'} dataSource={this.state.hotPolicy}/>
          </ScrollView>
          <Nav selected="0"/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    color: Color.red
  }
});


export default Home;