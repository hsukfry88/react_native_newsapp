/*表单验证函数*/

export const Validation = ( function() {
    const Strateg = {
        noNull: function(value) {
            console.log(value);
            return value !== '';
        },
        format: function(value) {
            const result = this.number(value);
            console.log('format', value, 'result', result);
            return result;
        },
        number: function(value) {
            const pattern = /0?(13|14|15|18)[0-9]{9}/;
            return pattern.test(value);
        },
        chines: function(value) {
            const pattern = /[\u4e00-\u9fa5]/;
            console.log('chines', pattern.test(value));
            return pattern.test(value);
        },
        noContent: function(value) {
            const pattern = /[A-Za-z0-9\-\u4e00-\u9fa5]+/
            console.log('noContent', pattern.test(value));
            return pattern.test(value);
        },
    }
    //对外接口暴漏方法
    return {
        check: function(type, value) {
            return Strateg[type] ? Strateg[type](value) : '没有该类型的检测方法';
        }
    }
} )()

export function MessageCode(typeArr, value) {

    if (typeArr) {
        let result;
        for (let i = 0; i < typeArr.length; i++) {
            result = Validation.check(typeArr[i], value);
            //console.log(result);
            if (!result) {
                return result;
            }
        }
        return result;
    } else {
        console.log('请选择验证类型');
    }

}