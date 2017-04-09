'use strict';
import React, { Component, PropTypes} from 'react';
import Nav from '../components/Nav';
import IconGroup from '../components/IconGroup';
import { StyleSheet, Text, View} from 'react-native';
import { CommonStyle} from '../config/theam';
import PullList from '../components/PullList';

class search extends Component {
    static defaultProps = {
        selected: 0,
    };
    static propTypes = {
        selected: React.PropTypes.number,
        policy: React.PropTypes.number
    };
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={[CommonStyle.container]}>
              <IconGroup selected={this.props.selected} router={Actions.search} actionType={'refresh'}/>
              <PullList policy={this.props.policy}/>
              <View>
                  <Nav selected="1"/>
              </View>       
            </View>
        )
    }
}
export default search;