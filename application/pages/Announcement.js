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
	Button,
	Icon
} from 'react-native-elements';
import {
	Text,
	StyleSheet,
	ScrollView,
	View,
	WebView,
} from 'react-native';
import localServer from '../config/domain';
import {
	Actions
} from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import ErrorPage from '../components/error';
import Loading from '../components/Loading';

class Announcement extends Component {
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
    	  		{this.state.error?<ErrorPage/>:<WebView style={styles.webView} source={{uri:`${localServer.name}/announcement/${this.props.title}/${this.props.id}`}}onError={this.err} renderError={this.err} onLoadStart={this.onLoadStart} onLoadEnd={this.onLoadEnd}></WebView>}		
				</View>
				<View style={styles.buttonWarp}>
						<View style={{backgroundColor:'#fff'}}>
	      		 <Button title='提交申报预约' buttonStyle={styles.buttonStyle} onPress={()=>Actions.MyPolicy({
	      		 				declare:true,
	      		 				policyid:this.props.id,
	      		 				articalType:2,
	      		 				policy:this.props.title})} />
	      		 </View>
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
	},
	webViewWapper: {
		height: Dimensions.get('window').height - 80
	},
	WebView: {
		height: Dimensions.get('window').height - 80,
		backgroundColor: '#fafafa',
		marginBottom: 60
	},
	center: {
		paddingTop: 10,
		paddingBottom: 10,
		textAlign: 'center',
		backgroundColor: '#fff'
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
		fontSize: FS.fs14,
		lineHeight: 18,
		color: Color.darkRed
	},
	fs14: {
		fontSize: FS.fs14,
		color: Color.darkRed,
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
		bottom: 0,
		left: 0,
		right: 0,
		flex: 1,
		height: 120,
		borderTopWidth: .5,
		backgroundColor: '#fff',
		borderColor: '#ddd',
		flexDirection: 'column'
	},
	align: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});


export default Announcement;