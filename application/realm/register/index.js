import Realm from 'realm';
import {
	AcListSchema,
	Announcement
} from '../schema';

export default class myRealm {
	constructor(schema, path) {
			//创建
			this.realm = new Realm({
				schema: schema,
				//path: '/Users/rongye/Desktop/default.realm'
			});
		}
		//保存表(Object)
	saveData(name, data) {
			this.realm.write(() => {
				this.realm.create(name, data, true);
			});
			console.log(`affect`, this.realm.objects(name).length);
		}
		//保存到表(Array)
	updatesData(name, data) {
		this.realm.write(() => {
			data.map((item) => {
				this.realm.create(name, item, true);
			})
		});
		console.log(`affect ${name}`, this.realm.objects(name).length)
	}

	getData(name, strar = 0, end = 10) {
			return this.realm.objects(name).slice(strar, end);
		}
		//删除
	deletSchema(name) {
		this.realm.write(() => {
			let table = this.realm.objects(name);
			console.log(table[0]);
			this.realm.delete(table);
		})
	}
}