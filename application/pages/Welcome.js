'use strict';

import React, {
	Component
} from 'react';

import {
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions,
	StatusBar,
	NetInfo
} from 'react-native';
import {
	Actions
} from 'react-native-router-flux';
import {
	HttpUrl
} from '../config/url';

class container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			connection: false
		}
		this.url = HttpUrl.get('Home');
		/*
			key(接口名称):table(realm表名)
		*/
		this.DataList = [{
			data: 'Announcement'
		}, {
			banner: 'Banner'
		}, {
			hotPolicy: 'HotPolicy'
		}]
		this._left = (Dimensions.get('window').width - 90) / 2;
		this.width = Dimensions.get('window').width;
		this.height = Dimensions.get('window').height;
		this.init = this.init.bind(this);
	}
	async componentDidMount() {
		try {
			//请求成功时，保存本地数据库
			const response = await fetch(this.url);
			const responseData = await response.json();
			this.saveData(responseData);
			this.init();
		} catch (error) {
			//当请求失败时
			await this.init();
		}
	}
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}
	async saveData(responseData) {
		this.DataList.map((item) => {
			let key = Object.keys(item)[0];
			let table = Object.values(item)[0];
			realm.updatesData(table, responseData[key]);
		});
	}
	init() {
		const me = this;
		this.timer = setTimeout(
			() => {
				me.jumpPage();
			},
			1000
		);
	}
	jumpPage() {
		const status = realm.getData('Login');
		if (status.length > 0) {
			Actions.main({
				type: 'reset'
			});
		} else {
			Actions.Login({
				type: 'replace'
			});
		}
	}

	render() {
		return (
			<View style={{flex:1,justifyContent:'center'}}>
				<StatusBar
          hidden={true}
        />
				<Image style={{resizeMode: Image.resizeMode.contain,height:this.height,width:this.width}}  source={require('../images/home.jpg')}  />
			</View>
		);
	}
}
const styles = StyleSheet.create({

});


export default container;