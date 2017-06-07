'use strict';
import React, { Component} from 'react';
import { View, Text} from 'react-native';
import FormComponent from '../../components/Form/FormGroup';
import LogoIcon from '../../components/LogoIcon';
import Progerss from '../../components/progress';
import { Button} from 'react-native-elements';
import { Actions} from 'react-native-router-flux';
import { AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { MessageCode, Validation} from '../../components/FormValidation';
import { CommonStyle, Form, Color} from '../../config/theam';

class Declare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            userError: true,
            companyError: true,
            industryError: true,
            phoneError: true,
        };
        this.error = [];
    }
    componentDidMount() {
        const User = realm.getData('User', 0, 1);
        console.log(User[0]);
        User.length > 0 ? this.setState({
            user: User[0].user,
            company: User[0].company,
            industry: User[0].industry,
            phone: User[0].phone
        }) : null;
    }
    render() {
        const {user, company, industry, phone, userError, companyError, industryError, phoneError, show} = this.state;
        const User = realm.getData('User', 0, 1);
        const {policy} = this.props;
        const Title = <View style={Form.declare}><Text style={CommonStyle.policy}>《{policy}》</Text></View>
        const inputConfig = [{
            defaultValue: company,
            placeholder: '请输入申报人公司名称',
            errAleart: '请填写正确的公司名称',
            err: 'companyError',
            names: 'company',
            status: companyError,
            icon: 'building',
            size: 15,
        }, {
            defaultValue: industry,
            placeholder: '请输入申报人所属行业',
            errAleart: '必须为中文字符',
            err: 'industryError',
            names: 'industry',
            status: industryError,
            icon: 'industry',
            size: 13,
        }, {
            defaultValue: user,
            placeholder: "请输入申报人姓名",
            errAleart: '请填写中文姓名',
            err: 'userError',
            names: 'user',
            status: userError,
            icon: 'user',
            size: 16,
        }, {
            defaultValue: phone,
            placeholder: "请输入申报人手机号",
            errAleart: '您的手机号码格式填写错误',
            err: 'phoneError',
            names: 'phone',
            status: phoneError,
            icon: 'phone',
            size: 16,
        }]
        // console.log(this.props);
        return (
            <View> 
                <LogoIcon/>
                {policy ? Title : null }
                <FormComponent onInputChange={this.onInputChange} inputConfig={inputConfig}/>
                <View>
                    <AutoGrowingTextInput  style={Form.TextArea} value={this.state.note} placeholder={'特殊备注'} onChange={(event) => this._onChange(event)} />
                </View>
                <Button title='提交申报预约'  buttonStyle={CommonStyle.buttonStyle} onPress={this.submitInfor}/>
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
    _onChange = (event) => {
        this.setState({
            note: event.nativeEvent.text || ''
        });
    }
    submitInfor = () => {
        let error = true;
        this.error.length = 0;
        this.checkError();
        console.log('error:', this.error);
        for (let i = 0; i < this.error.length; i++) {
            if (!this.error[i]) {
                return error = false;
            }
        }
        return error ? this.success() : null;
    }
    formate = (boolean, key) => {
        const obj = {};
        obj[key] = boolean;
        this.error.push(boolean);
        console.log(key, boolean);
        return boolean ? null : this.setState(obj);
    }
    checkError = () => {
        this.formate(MessageCode(['noContent'], this.state.company), 'companyError');
        this.formate(MessageCode(['chines'], this.state.industry), 'industryError');
        this.formate(MessageCode(['chines'], this.state.user), 'userError');
        this.formate(MessageCode(['number'], this.state.phone), 'phoneError')
    }
    success = () => {
        const me = this;
        this.setState({
            show: true,
        });
        const User = realm.getData('User', 0, 1);
        const {id, policy, articalType} = this.props;
        const articaltype = articalType == 'apply' ? 1 : 2;
        const {company, industry, name, phone, note} = this.state;
        console.log(User[0]);
        const data = {
            uid: realm.getData('Login')[0].uid,
            policyid: User[0].id,
            policytitle: policy,
            articaltype: articaltype,
            company: company,
            industry: industry,
            name: name,
            tel: phone,
            note: note
        };
        this.postData(data);
    }
    postData = async(data) => {
        const http = `${HttpUrl.get('root')}/form`;
        const response = await fetch(http, {
            method: 'POST',
            headers: {
                //'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        if (responseData.result) {
            data.articaltype == 1 ? this.saveData(data) : this.hidden();
        }
    }
    saveData = (data) => {
        realm.saveData('StartPolicy', {
            policyid: data.policyid,
            policytitle: data.policy,
        });
        this.hidden();
        Actions.pop();
    }
    hidden = () => {
        this.setState({
            show: false
        });
    }

}

export default Declare;