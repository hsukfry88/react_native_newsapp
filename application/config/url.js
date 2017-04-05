export const HttpUrl = (function() {
	//接口根Url
	const baseUrl = 'http://localhost:3000';
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
		paging: function(param, policyType) {
			//console.log('policyType');
			const url = policyType ? `${param.url}/${policyType}/${param.length}/${param.start}` : `${param.url}/${param.length}/${param.start}`
			return url;
		}
	}
})();