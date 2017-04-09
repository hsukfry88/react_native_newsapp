export const HttpUrl = ( function() {
    //接口根Url
    const baseUrl = 'https://bxs.ghspace.cn';
    const Strateg = {
        Home: `${baseUrl}/news`,
        Search: `${baseUrl}/policy`,
        AnnouncementList: `${baseUrl}/announcementList`
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