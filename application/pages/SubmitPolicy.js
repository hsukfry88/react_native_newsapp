'use strict';
import React, {
	Component
} from 'react';
import {
	StyleSheet,
	View,
	WebView,
} from 'react-native';
import localServer from '../config/domain';
import {
	Actions
} from 'react-native-router-flux';
import {
	Color,
	theam,
	FS
} from '../config/theam';
import Dimensions from 'Dimensions';
import ErrorPage from '../components/error';
import Loading from '../components/Loading';

class SubmitPolicy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			loading: true
		}
		this.err = this.err.bind(this);
		this.onLoadEnd = this.onLoadEnd.bind(this);
		this.getUrl = this.getUrl.bind(this);
		this.http = this.getUrl();
	}
	getUrl() {
		let url;
		if (this.props.articalType == 2) {
			url = `${localServer.name}/announcement/${this.props.title}`;
		} else {
			url = `${localServer.name}/artical/${this.props.id}`;
		}
		return url;
	}
	err() {
		this.setState({
			error: true
		})
	}
	onLoadEnd() {
		this.setState({
			loading: false
		})
	}
	render() {
		console.log(this.http);
		return (
			<View style={styles.container}>
    	  <View style={styles.webViewWapper}>
    	  		{this.state.loading?<Loading/>:null}
    	  		{this.state.error?<ErrorPage/>:<WebView style={styles.webView} source={{uri:this.http}} onError={this.err} renderError={this.err} onLoadStart={this.onLoadStart} onLoadEnd={this.onLoadEnd}></WebView>}
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		marginTop: 60,
		paddingBottom: 20,
	},
	webViewWapper: {
		height: Dimensions.get('window').height
	},
	webView: {
		height: Dimensions.get('window').height,
		backgroundColor: '#fafafa',
	},
	center: {
		paddingTop: 10,
		paddingBottom: 10,
		textAlign: 'center'
	},
	ScrollViewWarp: {
		backgroundColor: '#eee',
		paddingBottom: 10,
	},

	row: {
		flexDirection: 'row',
	},
	bd: {
		borderBottomWidth: 1,
		borderColor: Color.darkRed,
	},
	m10: {
		marginTop: 10,
		marginBottom: 10,
	},
	title: {
		fontSize: FS.fs16,
		lineHeight: 18,
		marginBottom: 15,
		color: Color.darkRed
	},
	fs14: {
		fontSize: FS.fs14,
		color: Color.gray9,
		paddingBottom: 10,
	},
	titleWarp: {
		flex: 1,
		height: 40,
		paddingTop: 10,
		paddingBottom: 10,
		marginTop: 10,
		marginBottom: 10,
		justifyContent: 'center',
		backgroundColor: '#fff',
		borderTopWidth: .5,
		borderBottomWidth: .5,
		borderColor: '#ddd',
	},
	tel: {
		fontSize: 15,
		color: Color.darkRed,
	},
	buttonStyle: {
		marginTop: 15,
		backgroundColor: '#ec082e'
	},
	buttonWarp: {
		position: 'absolute',
		height: 120,
		bottom: 0,
		left: 0,
		right: 0,
		flex: 1,
		borderTopWidth: .5,
		backgroundColor: '#fff',
		borderColor: '#ddd',
	},
	align: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});
export default SubmitPolicy;