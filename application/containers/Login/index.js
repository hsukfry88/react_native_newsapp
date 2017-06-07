'use strict';
import React, { Component} from 'react';
import md5 from 'md5';
import moment from 'moment';
import LogoIcon from '../../components/LogoIcon';
import FormContainer from '../../components/Form/FormGroup';
import { MessageCode, Validation} from '../../components/FormValidation';
import Progress from '../../components/progress';
import { View, Text} from 'react-native';
import { CommonStyle} from '../../config/theam';
import { Button} from 'react-native-elements';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageCode: '',
            messageBtn: '获取验证码',
            phone: '',
            show: false,
            phoneError: true,
            messageError: true,
            disabled: false,
        };
        this.wait = 60;
    }
    render() {
        const {show, phoneError, messageError, messageBtn, disabled} = this.state;
        const inputConfig = [{
            placeholder: "请输入您的手机号",
            errAleart: '您的手机号码格式填写错误',
            err: 'phoneError',
            names: 'phone',
            status: phoneError,
            icon: 'user',
            size: 15,
            btn: false,
        }, {
            placeholder: '验证码',
            errAleart: '验证码填写错误',
            err: 'messageError',
            names: 'messageCode',
            status: messageError,
            icon: 'lock',
            btn: true,
            size: 15,
            messageBtn: messageBtn,
            disabled: disabled
        }]
        return (
            <View>
                <LogoIcon/>
                <Progress show={show} progressStyle={CommonStyle.progress}/>
                <FormContainer onInputChange={this.onInputChange}  sendMessage={this.sendMessage} inputConfig={inputConfig}/>
                <Button title='登录' borderRadius={CommonStyle.borderRadius} buttonStyle={CommonStyle.buttonStyle} onPress={this.verification}/>
            </View>
        )
    }

    /*_onChangeText*/
    onInputChange = (text, errkey, key) => {
        const value = {};
        value[key] = text;
        value[errkey] = true;
        this.setState(value);
    //console.log(text, errorText, key);
    }
    //md5加密
    Mademd5 = () => {
        const time = moment().format('YYYY-MM-DD');
        let md5str = `${this.state.phone}${time}${HttpUrl.get('md5')}`;
        md5str = md5(md5str);
        //console.log(md5str);
        return md5str;
    }
    /*60s等待*/
    setTime = () => {
        //console.log(this.wait);
        const me = this;
        if (this.wait == 0) {
            this.setState({
                messageBtn: '重新获取验证码',
                disabled: false
            });
            return this.wait = 60;
        } else {
            me.setState({
                disabled: true,
                messageBtn: `${me.wait}秒后重新发送`,
            })
            setTimeout(function() {
                me.wait--;
                me.setTime != null ? me.setTime() : null;
            }, 1000);
        }
    }


    //获取验证结果
    getVerificationCode = async() => {
        try {
            const code = this.Mademd5();
            const http = `${HttpUrl.get('message')}/${this.state.phone}/${code}`;
            //console.log(http);
            const response = await fetch(http, {
                method: 'POST',
                headers: {
                    "Content-Type": "text/plain"
                }
            });
        } catch ( error ) {
            console.error(error)
        }
    }
    //发送验证请求
    postVerification = async() => {
        this.setState({
            show: true
        });
        const code = this.Mademd5();
        const http = `${HttpUrl.get('validation')}/${this.state.phone}/${this.state.messageCode}/${code}`;
        console.log(http);
        const response = await fetch(http, {
            method: 'POST',
            headers: {
                "Content-Type": "text/plain"
            }
        });
        const responseData = await response.json();
        return responseData;
    }
    //验证码结果成功
    success = (responseData) => {
        const {phone} = this.state;
        this.setState({
            show: false
        });
        console.log('验证通过');
        console.log(responseData);
        // /*保存数据操作成功*/
        const data = [{
            uid: Number(responseData.userid),
            phone: phone,
        }]
        realm.updatesData('Login', data); //更新本地数据库

        /*测试*/
        // const data = [{
        //     uid: Number(100),
        //     phone: '18380195232',
        // }]
        // realm.updatesData('Login', data); //更新本地数据库
        this.setTime = null;
        Actions.Registered({
            title: '相关信息',
            phone: phone,
            uid: Number(responseData.userid),
            //uid: Number(100),
            type: 'replace'
        });
    }
    //验证码结果错误
    failure = () => {
        this.setState({
            show: false,
            messageError: false
        });
    }
    /**
     * [验证码和手机号验证函数入口]
     * @return {[type]} [description]
     */
    verification = async() => {
        const phone = this.state.phone;
        const messageCode = this.state.messageCode;
        const phoneFormat = MessageCode(['noNull', 'format'], phone);
        const messageFormat = MessageCode(['noNull'], messageCode);
        console.log(messageFormat, phoneFormat);
        if (phoneFormat == true && messageFormat == true) {
            try {
                const responseData = await this.postVerification();
                responseData.result ? this.success(responseData) : this.failure();
            } catch ( error ) {
                console.error(error)
            }
        } else {
            //console.log(messageFormat, phoneFormat);
            this.formFormatError(messageFormat, phoneFormat);
        }
    }
    /*格式错误*/
    formFormatError = (messageFormat, phoneFormat) => {
        this.setState({
            messageError: messageFormat,
            phoneError: phoneFormat
        });
    }
    /*短信验证*/
    sendMessage = () => {
        const phone = this.state.phone;
        let typeArr = ['noNull', 'format'];
        let result = MessageCode(typeArr, phone);
        console.log(result);
        if (result) {
            this.setTime();
            return this.getVerificationCode();
        } else {
            this.setState({
                phoneError: false
            });
        }
    }
}
export default LoginForm;