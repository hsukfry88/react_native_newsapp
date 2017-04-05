'use strict';
import React, {
	Component
} from 'react';
import Nav from '../components/Nav';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import {
	Button,
} from 'react-native-elements';
import {
	Actions
} from 'react-native-router-flux';
import ListItem from '../components/ListItem/item_rightIcon';
import Modal from 'react-native-root-modal';

class Setting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			loginState: realm.getData('Login')
		};
		this.cancelLogin = this.cancelLogin.bind(this);
		console.log(this.state.loginState);
	}
	showModal = () => {
		console.log(111);
		this.setState({
			visible: true
		});
	};

	hideModal = () => {
		this.setState({
			visible: false
		});
	};

	cancelLogin() {
		realm.deletSchema('Login');
		this.setState({
			visible: false
		});
		Actions.init({
			type: 'replace'
		});
	}

	render() {
		return (
			<View style={styles.bgGray}>
				<Modal visible={this.state.visible}>
            <View style={styles.modalContainer}>
            		<View style={styles.modalHeader}>
            			<Text>退出</Text>
            		</View>
                <View style={styles.modalBody}>
                	<Text style={styles.text}>退出后将不能为您保存账号信息,确认退出吗？</Text>
                </View>
                <View style={styles.modalBottm}>
                		<TouchableOpacity style={styles.makeSure} onPress={this.cancelLogin}>
				            		<Text style={styles.red}>确认</Text>
				            </TouchableOpacity>
                		<TouchableOpacity style={styles.close}  onPress={this.hideModal}>
				               <Text style={styles.red}>取消</Text>
				            </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <View style={styles.container}>
	        <TouchableOpacity  onPress={Actions.UserInfo}>
							<ListItem title={'个人信息'} containerStyle={{backgroundColor:'#fff',paddingTop:15,paddingBottom:15}} />
					</TouchableOpacity>
					<ListItem title={'关于百晓生'} containerStyle={{backgroundColor:'#fff',paddingTop:15,paddingBottom:15}}/>
				</View>
				{this.state.loginState.length>0?<Button title='退出登录' buttonStyle={styles.buttonStyle} color={'#999'} onPress={
							this.showModal
            }/>:null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	bgGray: {
		flex: 1,
		backgroundColor: '#eeeeee'
	},
	container: {
		marginTop: 50,
		paddingTop: 20,
		paddingBottom: 20,
	},
	red: {
		color: '#ec082e',
	},
	buttonStyle: {
		borderWidth: .5,
		borderColor: '#ccc',
		backgroundColor: '#fff'
	},
	innerContainer: {
		borderRadius: 10,
		alignItems: 'center',
	},
	row: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		marginBottom: 20,
	},
	rowTitle: {
		flex: 1,
		fontWeight: 'bold',
	},
	button: {
		borderRadius: 5,
		flex: 1,
		height: 44,
		alignSelf: 'stretch',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	buttonText: {
		fontSize: 18,
		margin: 5,
		textAlign: 'center',
	},
	modalButton: {
		marginTop: 10,
	},
	modalHeader: {
		//flex: 1,
		marginBottom: 20,
	},
	modalBottm: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	makeSure: {
		marginRight: 20,
	},
	modalContainer: {
		height: 125,
		width: 250,
		borderRadius: 4,
		padding: 14,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#fff'
	},
	modalHeaderText: {
		textAlign: 'left',
	},
	text: {
		color: '#666'
	},
});



export default Setting;