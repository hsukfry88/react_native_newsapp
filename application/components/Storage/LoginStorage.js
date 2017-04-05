import storage from './Storage';
class LoginStorage {
	/*保存用户信息内容*/
	saveLoginStatus(phone, uid, key) {
		console.log('存入登陆状态')
		storage.save({
			key: key,
			rawData: {
				'tel': phone,
				'uid': uid,
				'loginnumber': 1
			},
			expires: null
		})
	}
	async readLoginStatus(key) {
		const result = await storage.load({
			key: key,
			syncInBackground: true,
		});
		console.log(result);
		return await result.loginnumber > 0 ? true : false;
	}
	async removeLoginStatus(key) {
		storage.remove({
			key: key
		});
	}
	saveUserInfor(User, key) {
		storage.save({
			key: key,
			rawData: {
				'name': User.user,
				'tel': User.tel,
				'company': User.company,
				'industry': User.industry,
				'area': User.area
			},
			expires: null
		});
	}
	async readStorage(key) {
		const result = await storage.load({
			key: key,
			syncInBackground: true,
		});
		//console.log('res', await result.ret);
		return await result;
	}
}

export default LoginStorage;