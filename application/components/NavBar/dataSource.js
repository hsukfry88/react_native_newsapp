import { Actions} from 'react-native-router-flux';
export default {
    tab: [{
        title: '首页',
        type: 'font-awesome',
        router: Actions.main,
        name: 'home',
    }, {
        title: '政策查询',
        type: 'simple-line-icon',
        router: Actions.SearchContainer,
        name: 'magnifier',
    }, {
        title: '申报预约',
        type: 'font-awesome',
        router: Actions.SubmitNav,
        name: 'pencil',
    }, {
        title: '个人中心',
        type: 'font-awesome',
        router: Actions.User,
        name: 'user',
    }]
}