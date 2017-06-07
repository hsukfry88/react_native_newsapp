'use strict';
import React, { Component} from 'react';
import { ScrollView, View} from 'react-native';
import { Margin, theam, ScrollBottom, Color} from '../config/theam';
import Conatiner from '../containers/Home/index';
import NavBar from '../components/NavBar';

class Home extends Component {
    render() {
        return (
            <View style={theam.Container}>
                <ScrollView style={ScrollBottom.bottom40}>
                    <Conatiner/>
                </ScrollView>
                <NavBar selected="0"/>
            </View>
        )
    }
}
export default Home;