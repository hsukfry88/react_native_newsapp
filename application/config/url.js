//sdk分享logo
export const shareImg = 'https://bxs.ghspace.cn/assets/app.png';
export const HttpUrl = ( function() {
    //接口根Url
    const baseUrl = 'https://bxs.ghspace.cn';
    const Strateg = {
        root: `${baseUrl}`,
        Home: `${baseUrl}/news`,
        Search: `${baseUrl}/policy`,
        PolicyDetail: `${baseUrl}/artical`,
        Announcement: `${baseUrl}/announcement`,
        AnnouncementList: `${baseUrl}/announcementList`,
        message: 'https://api.ghspace.cn/sendcode/pu8WNw3c5Ueq8BGtnYEQ7Q1chTVMEb',
        md5: 'ghspace_bxs_)(*!@#170306',
        validation: 'https://api.ghspace.cn/smsvalidation'
    }
    return {
        get: function(type) {
            return Strateg[type];
        },
        //生成分页Url函数
        //policyType, start = initStart, length = listLength
        paging: function(param) {
            //console.log('policyType');
            const url = param.policy ? `${param.url}/${param.policy}/${param.length}/${param.offset}` : `${param.url}/${param.length}/${param.offset}`
            return url;
        }
    }
} )();