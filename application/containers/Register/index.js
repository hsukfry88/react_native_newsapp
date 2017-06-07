'use strict';

import React, { Component} from 'react';
import FormContainer from '../../components/Form/FormGroup';
import LogoIcon from '../../components/LogoIcon';
import Progerss from '../../components/progress';
import { MessageCode, Validation} from '../../components/FormValidation';
import { CommonStyle} from '../../config/theam';
import { View} from 'react-native';
import { Button} from 'react-native-elements';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: this.props.uid,
            phone: this.props.phone,
            userError: true,
            companyError: true,
            industryError: true,
            regionError: true,
            show: false,
        }
        this.error = [];
    }
    render() {
        const {userError, companyError, industryError, regionError, show} = this.state;
        const inputConfig = [{
            placeholder: "请输入您的姓名",
            errAleart: '请填写中文姓名',
            err: 'userError',
            names: 'user',
            size: 15,
            status: userError,
            icon: 'user',
        }, {
            placeholder: '请输入您的公司名称',
            errAleart: '请填写正确的公司名称',
            err: 'companyError',
            names: 'company',
            size: 15,
            status: companyError,
            icon: 'building',
        }, {
            placeholder: '请输入您的所属行业',
            errAleart: '必须为中文字符',
            err: 'industryError',
            names: 'industry',
            size: 13,
            status: industryError,
            icon: 'industry',
        }, {
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
                <Button title='提交注册' borderRadius={CommonStyle.borderRadius} buttonStyle={CommonStyle.buttonStyle} onPress={this.submitInfor} /> 
                <Button title='稍后填写' borderRadius={CommonStyle.borderRadius} buttonStyle={CommonStyle.buttonStyle} onPress={this.leavePage} />
                <Progerss show={show} progressStyle={CommonStyle.progress2}/>
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
    leavePage = () => {
        Actions.main({
            title: '政策百晓生',
            type: 'reset'
        });
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
            }).catch(function(error) {
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
export default RegisterForm;