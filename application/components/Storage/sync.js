import storage from './Storage';
import {
	Actions
} from 'react-native-router-flux';
module.exports = {
	userInformation(params) {
		return false;
	},
	loginStatus(params) {
		Actions.Login({
			type: 'replace',
		});
	}
}