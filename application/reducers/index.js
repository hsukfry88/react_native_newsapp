import { Get_SHARE_INFO} from '../actions/actionsType';
import { combineReducers} from 'redux';
const selectedShareInfor = (state = {
        title: null,
        url: null
    } , action) => {
    switch (action.type) {
    case Get_SHARE_INFO:
        /*修改共享文章信息*/
        return Object.assign(state, {
            title: action.title,
            url: action.url,
        })
    default:
        return state;
    }
}

const rootReducer = combineReducers({
    selectedShareInfor
});
export default rootReducer;