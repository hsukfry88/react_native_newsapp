'use strict';
import React, { Component} from 'react';
import { WebView, View} from 'react-native';
import ErrorPage from '../error';
import Loading from '../Loading';
import { Color, theam, FS, CommonStyle} from '../../config/theam';
class WebViewContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: true
        }
    }
    err = () => {
        this.setState({
            error: true
        })
    }
    onLoadEnd = () => {
        this.setState({
            loading: false
        })
    }
    render() {
        const {http, style} = this.props;
        const content = <WebView style={style}
        source={{
            uri: http
        }}
        onError={this.err}
        renderError={this.err}
        onLoadEnd={this.onLoadEnd}/>
        return (
            <View style={CommonStyle.webViewWapper}>
            		{this.state.error ? <ErrorPage/> : content }
             	 	{this.state.loading ? <Loading/> : null}
            </View>
        )
    }
}


export default WebViewContainer;