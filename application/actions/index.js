import { Get_SHARE_INFO} from './actionsType';
export const selectInfor = (title, url) => {
    return ({
        type: Get_SHARE_INFO,
        title,
        url
    })
}