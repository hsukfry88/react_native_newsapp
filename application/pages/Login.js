/*登录页面*/
'use strict';
import React, { Component} from 'react';
import { StyleSheet, View, Image, Text, Platform,
} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, Icon,
} from 'react-native-elements';
import { MessageCode, Validation} from '../components/phoneForm/validation';
import { CommonStyle, FS, Color, Form, theam} from '../config/theam';
import md5 from 'md5';
import moment from 'moment';
import Progress from '../components/progress';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            messageCode: '',
            wait: false,
            phone: '',
            phoneError: '',
            messageError: '',
            messageBtn: '免费获取验证码',
        // messageStatus: false,
        };
        this.messageStatus = false;
        this.wait = 60;
        this._sendMessage = this._sendMessage.bind(this);
        this.postFetch = this.postFetch.bind(this);
        this.postValidation = this.postValidation.bind(this);
        this._onChangePhoneText = this._onChangePhoneText.bind(this);
        this._onChangeMessageText = this._onChangeMessageText.bind(this);
    }
    //md5加密
    Mademd5() {
        const time = moment().format('YYYY-MM-DD');
        let md5str = `${this.state.phone}${time}md5str`;
        md5str = md5(md5str);
        //console.log(md5str);
        return md5str;
    }
    async postFetch() {
        try {
            const code = this.Mademd5();
            const http = `https://localhost/${this.state.phone}/${code}`;
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
    async postValidation() {
        const phone = this.state.phone;
        const messageCode = this.state.messageCode;
        const phoneFormat = MessageCode(['noNull', 'format'], phone);
        const messageFormat = MessageCode(['noMessage'], messageCode);
        if (phoneFormat == true && messageFormat == true) {
            try {
                this.setState({
                    wait: true
                });
                const code = this.Mademd5();
                const http = `https://localhost/${this.state.phone}/${this.state.messageCode}/${code}`;
                console.log(http);
                const response = await fetch(http, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "text/plain"
                    }
                });
                const responseData = await response.json();
                if (responseData.result) {
                    this.setState({
                        wait: false
                    });
                    console.log('验证通过');
                    console.log(responseData);
                    /*保存数据操作成功*/
                    const data = [{
                        uid: Number(responseData.userid),
                        phone: this.state.phone,
                    }]
                    realm.updatesData('Login', data);
                    clearTimeout(this.setTimeFn);
                    Actions.Registered({
                        title: '相关信息',
                        phone: phone,
                        uid: Number(responseData.userid),
                        type: 'replace'
                    });
                } else {
                    this.setState({
                        wait: false
                    });
                    this.setState({
                        messageError: '验证码或手机号错误'
                    })
                }
            } catch ( error ) {
                console.error(error)
            }
        } else {
            if (messageFormat && messageFormat != true) {
                this.setState({
                    messageError: messageFormat
                });
            }
            if (messageFormat && phoneFormat != true) {
                this.setState({
                    phoneError: phoneFormat
                });
            }
        }
    }
    /*60s等待*/
    time() {
        if (this.wait == 0) {
            this.messageStatus = false;
            this.setState({
                messageBtn: '重新获取验证码',
            });
            this.wait = 60;
        } else {
            if (!this.messageStatus) {
                this.messageStatus = true;
            }
            this.wait--;
            this.setState({
                messageBtn: `${this.wait}秒后重新发送`,
            })
            const _this = this;
            this.setTimeFn = setTimeout(function() {
                _this.time();
            },
                1000)
        }
    }
    /*短信验证*/
    _sendMessage() {
        const phone = this.state.phone;
        let typeArr = ['noNull', 'format'];
        let result = MessageCode(typeArr, phone);
        if (result == true && !this.messageStatus) {
            this.time();
            return this.postFetch();
        } else {
            this.setState({
                phoneError: result
            });
        }
    }

    /*************此处代码解耦重构*******************/

    /*_onChangeText*/
    _onChangePhoneText(text) {
        if (this.state.phoneError != '') {
            this.setState({
                phoneError: ''
            })
        } else {
            this.setState({
                phone: text
            })
        }
    }
    _onChangeMessageText(text) {
        if (this.state.messageError != '') {
            this.setState({
                messageError: ''
            })
        } else {
            this.setState({
                messageCode: text
            })
        }

    }

    render() {
        return (
            <View style={CommonStyle.container}>
          <View style={CommonStyle.contentCenter}>
              <Image source={require('../images/logo.png')} style={theam.welcomeImg}/>
          </View>
          <FormLabel labelStyle ={Form.lable}>手机号:</FormLabel>
          <View>
              <FormInput inputStyle={Form.InputStyle} containerStyle={Form.InputContainer}   underlineColorAndroid="transparent" onChangeText={(text) => {
                this._onChangePhoneText(text)
            }}
            keyboardType={'numeric'}/>
              <Icon containerStyle={Form.FormIcon} type={Form.IconType} name='user'  color={Form.InputIconColor} size={Form.IconSize}  />
          </View>
          {this.state.phoneError != '' ? <View style={Form.errorAlert}><Icon
            name='exclamation-circle' type={Form.IconType} color={Form.errorIconColor} size={Form.errorIconSize}/><Text style={Form.errorText}>{this.state.phoneError}</Text></View> : null}
          <FormLabel labelStyle ={Form.lable}>验证码:</FormLabel>
          <View>
            <View>
              <FormInput keyboardType={'numeric'}  inputStyle={Form.InputStyle} containerStyle={Form.InputContainer}   underlineColorAndroid="transparent" onChangeText={(text) => {
                this._onChangeMessageText(text)
            }}/>
              <Button title={this.state.messageBtn} fontSize={FS.fs14} color={Color.gray9} buttonStyle={theam.buttonStyle} backgroundColor={Color.white}  onPress={this._sendMessage} disabled={this.messageStatus} disabledStyle={theam.disableButton}/>
            </View>
            <Icon containerStyle={Form.FormIcon} type={Form.IconType} name='lock'  color={Form.InputIconColor} size={Form.IconSize} />
          </View>
          {this.state.messageError != '' ? <View style={Form.errorAlert}><Icon
            name='exclamation-circle' type={Form.IconType} color={Form.errorIconColor} size={Form.errorIconSize}/><Text style={Form.errorText}>{this.state.messageError}</Text></View> : null}
          <View>
          <Button title='登录' borderRadius={4} buttonStyle={CommonStyle.buttonStyle} onPress={this.postValidation} />   
          </View>  
           {this.state.wait ? <View style={CommonStyle.wait}><Progress/></View> : null}
      </View>
            );
    }
}
export default Login;