'use strict';

import React, { Component} from 'react';
import localServer from '../config/domain';
import * as CommonStyle from '../config/theam';
import ListItem from '../containers/ItemContainer';
import NavBar from '../components/NavBar';
import { Button, Icon, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import { Form} from '../config/theam';
import { AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { StyleSheet, View, Text, TextInput, ScrollView, Dimensions} from 'react-native';
import Progress from '../components/progress';
// import SubmitAnnouncement from '../components/List/SubmitAnnouncement';
import { Actions} from 'react-native-router-flux';
import { MessageCode} from '../components/FormValidation';

class SubmitInfor extends Component {
    constructor(props) {
        super(props);
        const User = realm.getData('User', 0, 1);
        this.state = {
            announcement: realm.getData('Announcement'),
            wait: false,
            error: false,
            uid: '',
            note: '',
            userError: '',
            companyError: '',
            industryError: '',
            regionError: '',
            phoneError: '',
            ...User[0]
        }
        this.error = [];
        this.submiteForm = this.submiteForm.bind(this);
        this.checkError = this.checkError.bind(this);
        this.postData = this.postData.bind(this);
        this.formate = this.formate.bind(this);
        this.saveData = this.saveData.bind(this);
    }
    /*inputText*/
    _onChangeText(key, text, err) {
        const obj = {};
        obj[key] = text;
        err[err] = false;
        this.setState(obj);
        this.setState(err);
    }
    _onChange(event) {
        this.setState({
            note: event.nativeEvent.text || ''
        });
    }
    formate(boolean, key) {
        const obj = {};
        obj[key] = true;
        this.error.push(boolean);
        return boolean ? null : this.setState(obj);
    }
    checkError() {
        this.formate(MessageCode(['noContent'], this.state.company), 'companyError');
        this.formate(MessageCode(['chines'], this.state.industry), 'industryError');
        this.formate(MessageCode(['chines'], this.state.name), 'userError');
        this.formate(MessageCode(['number'], this.state.phone), 'phoneError')
    }
    saveData() {
        if (this.props.id != undefined) {
            realm.saveData('StartPolicy', {
                policyid: Number(this.props.id),
                policytitle: this.props.policy,
            });
        }
    }
    postData() {
        this.setState({
            wait: true,
        });
        const data = {
            policyid: this.props.id,
            policytitle: this.props.policy,
            company: this.state.company,
            industry: this.state.industry,
            name: this.state.name,
            tel: this.state.phone,
            note: this.state.note
        };
        fetch(`${localServer.name}/form`, {
            method: 'POST',
            headers: {
                //'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseData) => {
                if (responseData.result) {
                    this.saveData();
                    this.setState({
                        wait: false,
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
    submiteForm() {
        let error = true;
        this.error.length = 0;
        this.checkError();
        for (let i = 0; i < this.error.length; i++) {
            //console.log(this.error[i]);
            if (!this.error[i]) {
                return error = false;
            }
        }
        return error ? this.postData() : null;
    }

    render() {
        const ScreenHeight = Dimensions.get('window').height;
        return (
            <View style={[Form.Container]}>
          <FormLabel labelStyle ={Form.lable}>公司名称:</FormLabel>
          <View>
              <FormInput  containerStyle={Form.InputContainer} inputStyle={Form.InputStyle} onChangeText={(text) => {
                this._onChangeText('company', text, {
                    companyError: false
                })
            }} underlineColorAndroid="transparent" maxLength={15}  defaultValue={this.state.company}/>
              <Icon containerStyle={Form.FormIcon} type={Form.IconType} name='building' size={Form.IconSize}   color={Form.InputIconColor} />
              { this.state.companyError ? <View style={Form.errorAlert}><Icon
            name='exclamation-circle'type={Form.IconType} color={Form.errorIconColor} size={Form.errorIconSize}/><Text style={Form.errorText}>请填写正确的公司名称</Text></View> : null }
          </View>
          <FormLabel labelStyle ={Form.lable}>所属行业:</FormLabel>
          <View>
              <FormInput  containerStyle={Form.InputContainer} inputStyle={Form.InputStyle} onChangeText={(text) => {
                this._onChangeText('industry', text, {
                    industryError: false
                })
            }} underlineColorAndroid="transparent"maxLength={10} defaultValue={this.state.industry}/>
              <Icon containerStyle={[Form.FormIcon, {
                left: 32
            }]} type={Form.IconType} name='graduation-cap' size={16}  color={Form.InputIconColor} />
              { this.state.industryError ? <View style={Form.errorAlert}><Icon
            name='exclamation-circle'type={Form.IconType} color={Form.errorIconColor} size={Form.errorIconSize}/><Text style={Form.errorText}>必须为中文字符</Text></View> : null }
          </View>


          <FormLabel labelStyle ={Form.lable}>申报人:</FormLabel>
          <View>
              <FormInput containerStyle={Form.InputContainer} inputStyle={Form.InputStyle}   onChangeText={(text) => {
                this._onChangeText('user', text, {
                    userError: false
                })
            }} underlineColorAndroid="transparent" maxLength={5} defaultValue={this.state.name}/>
              <Icon containerStyle={Form.FormIcon} type={Form.IconType} name='user'  color={Form.InputIconColor} size={Form.IconSize}  />
              { this.state.userError ? <View style={Form.errorAlert}><Icon
            name='exclamation-circle'type={Form.IconType} color={Form.errorIconColor} size={Form.errorIconSize}/><Text style={Form.errorText}>必须为中文字符</Text></View> : null }
          </View>


          <FormLabel labelStyle ={Form.lable}>联系电话:</FormLabel>
          <View>
              <FormInput  containerStyle={Form.InputContainer} inputStyle={Form.InputStyle} onChangeText={(text) => {
                this._onChangeText('phone', text, {
                    phoneError: false
                })
            }}   underlineColorAndroid="transparent"
            keyboardType={'numeric'} defaultValue={this.state.phone}/>
              <Icon containerStyle={Form.FormIcon} type='font-awesome' name='phone'  color={Form.InputIconColor} size={Form.IconSize}  />
              {this.state.phoneError ? <View style={Form.errorAlert}><Icon
            name='exclamation-circle'type={Form.IconType} color={Form.errorIconColor} size={Form.errorIconSize}/><Text style={Form.errorText}>请填写正确的手机号码</Text></View> : null}
          </View>
          <View>
            {this.props.declare ? <View style={{
                margin: 15
            }}><Text style={{
                color: '#ec082e'
            }}>拟申报政策:{this.props.policy}</Text></View> : null}
          </View>  
          <FormLabel labelStyle ={Form.lable}>特殊备注:</FormLabel>       
          <View style={{
                marginTop: 5,
                height: 40
            }}>
            <AutoGrowingTextInput  style={Form.TextArea} value={this.state.note} onChange={(event) => this._onChange(event)} />
          </View>
          {this.state.wait ? <Progress/> : null} 
          <View>
          <Button title='提交申报预约' buttonStyle={CommonStyle.CommonStyle.buttonStyle} onPress={
            this.submiteForm
            }/>
          </View>
          <NavBar selected="2"/>
        </View>
            );
    }
}
/*
        <SubmitAnnouncement listTitle={'申报公告'} dataSource={this.state.announcement}/>
*/
const styles = StyleSheet.create({
    buttonStyle: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 12,
        marginRight: 12,
        backgroundColor: '#ec082e',
        zIndex: 250
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#eee'
    },
    box: {
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 14,
        lineHeight: 24,
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    }
});


export default SubmitInfor;