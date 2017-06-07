'use strict';

import React, { Component} from 'react';
import { View, Text, Touch} from 'react-native';
import { Icon} from 'react-native-elements';
import { HeaderBar} from '../../config/theam';

class Header extends Component {
    render() {
        console.log(this.props);
        const {user, company, router, setting} = this.props;
        return (
            <View style={HeaderBar.container}>
		            <View style={HeaderBar.box}>
		                <View>
		                    <Text style={HeaderBar.boxTitle}>{user}</Text>
		                </View>
		                <View>
		                		<Icon style={HeaderBar.boxTitle} {...setting}/>
		                </View>
		            </View>
		            <View>
		                <Text style={HeaderBar.companyTxt}>{company}</Text>
		            </View>
        		</View>
        )
    }
}
export default Header;