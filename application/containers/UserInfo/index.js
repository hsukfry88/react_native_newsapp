'use strict';

import React, { Component} from 'react';
import LogoIcon from '../../components/LogoIcon';
import FormContainer from '../../components/Form/FormGroup';
import { MessageCode, Validation} from '../../components/FormValidation';
import Progress from '../../components/progress';
import { View, Text} from 'react-native';
import { CommonStyle} from '../../config/theam';
import { Button} from 'react-native-elements';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        const Login = realm.getData('Login', 0, 1);
        this.state = {
            uid: Login[0].uid,
            userError: true,
            phoneError: true,
            companyError: true,
            industryError: true,
            regionError: true,
            show: false,

        }
        this.error = [];
    }
    componentDidMount() {
        const User = realm.getData('User', 0, 1);
        console.log(User[0]);
        User.length > 0 ? this.setState({
            user: User[0].user,
            company: User[0].company,
            industry: User[0].industry,
            phone: User[0].phone,
            region: User[0].region
        }) : null;
    }
    render() {
        const {user, phone, company, building, industry, region, userError, companyError, industryError, regionError, phoneError, show} = this.state;
        const inputConfig = [{
            defaultValue: user,
            placeholder: "请输入您的姓名",
            errAleart: '请填写中文姓名',
            err: 'userError',
            names: 'user',
            size: 15,
            status: userError,
            icon: 'user',
        }, {
            defaultValue: phone,
            placeholder: "请输入您的手机号",
            errAleart: '您的手机号码格式填写错误',
            err: 'phoneError',
            names: 'phone',
            status: phoneError,
            icon: 'phone',
            size: 15,
            btn: false,
        }, {
            defaultValue: company,
            placeholder: '请输入您的公司名称',
            errAleart: '请填写正确的公司名称',
            err: 'companyError',
            names: 'company',
            size: 15,
            status: companyError,
            icon: 'building',
        }, {
            defaultValue: industry,
            placeholder: '请输入您的所属行业',
            errAleart: '必须为中文字符',
            err: 'industryError',
            names: 'industry',
            size: 13,
            status: industryError,
            icon: 'industry',
        }, {
            defaultValue: region,
            placeholder: '请输入您的所属地区',
            errAleart: '必须为中文字符',
            err: 'regionError',
            names: 'region',
            size: 15,
            status: regionError,
            icon: 'globe',
        }]
        return (
            <View>
                <LogoIcon/>
                <FormContainer onInputChange={this.onInputChange} inputConfig={inputConfig}  {...this.state}/>
                <Button title='提交个人信息' borderRadius={CommonStyle.borderRadius} buttonStyle={CommonStyle.buttonStyle} onPress={this.submitInfor} /> 
            </View>
        )
    }
    onInputChange = (text, errkey, key) => {
        const value = {};
        value[key] = text;
        value[errkey] = true;
        this.setState(value);
    //console.log(text, errorText, key);
    }
    formate = (boolean, key) => {
        const obj = {};
        obj[key] = boolean;
        this.error.push(boolean);
        console.log(key, boolean);
        return boolean ? null : this.setState(obj);
    }
    checkError = () => {
        this.formate(MessageCode(['chines'], this.state.user), 'userError');
        this.formate(MessageCode(['number'], this.state.phone), 'phoneError')
        this.formate(MessageCode(['noContent'], this.state.company), 'companyError');
        this.formate(MessageCode(['chines'], this.state.industry), 'industryError');
        this.formate(MessageCode(['chines'], this.state.region), 'regionError');
    }
    fetchPost = () => {
        console.log(this.state);
        fetch(`${HttpUrl.get('root')}/userInfor`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then((response) => response.json())
            .then((responseData) => {
                const result = responseData.data;
                if (Number(result.affectedRows) > 0) {
                    this.saveData();
                    this.setState({
                        show: false,
                    });
                    Actions.main({
                        type: 'reset'
                    });
                }
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                throw error;
            });
    }
    success = () => {
        this.setState({
            show: true,
        });
        this.fetchPost();
    }
    saveData = () => {
        console.log(this.state);
        realm.saveData('User', this.state);
    }
    submitInfor = () => {
        let error = true;
        this.error.length = 0;
        this.checkError();
        console.log(this.error);
        for (let i = 0; i < this.error.length; i++) {
            console.log(this.error[i]);
            if (!this.error[i]) {
                return error = false;
            }
        }
        return error ? this.success() : null;
    }
}
export default UserInfo;