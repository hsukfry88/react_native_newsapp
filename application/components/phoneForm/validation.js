/*表单验证函数*/

export const Validation = (function() {
	const Strateg = {
			noNull: function(value) {
				return value == '' ? '您输入手机号码不能为空' : true;
			},
			format: function(value) {
				const result = this.number(value);
				return result ? true : '您的手机号码不正确';
			},
			number: function(value) {
				const pattern = /0?(13|14|15|18)[0-9]{9}/;
				return pattern.test(value);
			},
			chines: function(value) {
				const pattern = /[\u4e00-\u9fa5]/;
				console.log(pattern.test(value));
				return pattern.test(value);
			},
			noContent: function(value) {
				const pattern = /[A-Za-z0-9\-\u4e00-\u9fa5]+/
				return pattern.test(value);
			},
			noMessage: function(value) {
				return value == '' ? '验证码不能为空' : true;
			},
			messageFormat: function(value) {
				return value == '' ? '验证码格式不正确' : true;
			},
		}
		//对外接口暴漏方法
	return {
		check: function(type, value) {
			return Strateg[type] ? Strateg[type](value) : '没有该类型的检测方法';
		}
	}
})()

export function MessageCode(typeArr, value) {

	if (typeArr) {
		let result;
		for (let i = 0; i < typeArr.length; i++) {
			result = Validation.check(typeArr[i], value);
			if (result != true) {
				return result
			}
		}
		return result;
	} else {
		console.log('请选择验证类型');
	}

}