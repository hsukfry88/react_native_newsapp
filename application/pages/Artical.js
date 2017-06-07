'use strict';
import React, { Component} from 'react';
import { CommonStyle} from '../config/theam';
import { StyleSheet, View} from 'react-native';
import { Actions} from 'react-native-router-flux';
import Panel from '../components/Panel';
import WebView from '../components/WebView';

class Artical extends Component {
    render() {
        console.log(this.props);
        const {url, submit} = this.props;
        return (
            <View style={CommonStyle.container2}>
                <WebView http={url} style={CommonStyle.webView}/>
                <View>
                    <Panel router={this.router} position={CommonStyle.panelPostion}/>
                </View>
             </View>
            );
    }
    router = () => {
        const {id, submit, articalType, policy} = this.props;
        articalType == 'apply' ? submit({
            id,
            policy
        }) : submit();
    }
}
export default Artical;