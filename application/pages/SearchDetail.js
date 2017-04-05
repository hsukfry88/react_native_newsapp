'use strict';
import React, {
	Component
} from 'react';
import {
	Color,
	theam,
	FS
} from '../config/theam';
import {
	List,
	ListItem,
	Button
} from 'react-native-elements';
import {
	Text,
	StyleSheet,
	ScrollView,
	View,
	WebView,
	NetInfo
} from 'react-native';
import localServer from '../config/domain';
import {
	Icon
} from 'react-native-elements'
import {
	Actions
} from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import ErrorPage from '../components/error';
import Loading from '../components/Loading';
class SearchDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			loading: true
		}
		this.err = this.err.bind(this);
		this.onLoadEnd = this.onLoadEnd.bind(this);
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
		return (
			<View style={styles.container}>
    	  <View style={styles.webViewWapper}>
    	  		{this.state.loading?<Loading/>:null}
    	  		{this.state.error?<ErrorPage/>:<WebView style={styles.webView} source={{uri:`${localServer.name}/artical/${this.props.id}`}} onError={this.err} renderError={this.err} onLoadStart={this.onLoadStart} onLoadEnd={this.onLoadEnd}></WebView>}
				</View>
	      <View style={styles.buttonWarp}>
	      		 <Button title='提交申报预约' buttonStyle={styles.buttonStyle} onPress={()=>Actions.SearchSubmitOrder({
	      		 				declare:true,
	      		 				articalType:1,
	      		 				policyid:this.props.id,
	      		 				policy:this.props.title})} />
	      		 <View style={[styles.row,styles.align]}> 
	      		 		<Text >申报条件咨询:</Text>
	      		 		<Text style={[styles.tel,styles.center]}>4000-151-756</Text>
	      		 </View>
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
		height: Dimensions.get('window').height - 80
	},
	webView: {
		height: Dimensions.get('window').height - 80,
		backgroundColor: '#fafafa',
		marginBottom: 60
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


export default SearchDetail;