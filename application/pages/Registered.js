'use strict';

import React, {
  Component
}
from 'react';

import {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet
}
from 'react-native';
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Icon
}
from 'react-native-elements';
import {
  Form
}
from '../config/theam';
import {
  Actions
}
from 'react-native-router-flux';
import localServer from '../config/domain';
import Progress from '../components/progress';
import {
  MessageCode
}
from '../components/phoneForm/validation';
class Registered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wait: false,
      error: false,
      phone: this.props.phone,
      uid: this.props.uid,
      user: '',
      company: '',
      industry: '',
      region: '',
      userError: '',
      companyError: '',
      industryError: '',
      regionError: ''
    };
    this.error = []
    this._onChangeText = this._onChangeText.bind(this);
    this.leavePage = this.leavePage.bind(this);
    this.submitInfor = this.submitInfor.bind(this);
    this.checkError = this.checkError.bind(this);
    this.postData = this.postData.bind(this);
    this.saveData = this.saveData.bind(this);
  }
  _onChangeText(key, text, err) {
    const obj = {};
    obj[key] = text;
    err[err] = false;
    this.setState(obj);
    this.setState(err);
  }
  leavePage() {
    Actions.main({
      title: '政策百晓生',
      type: 'reset'
    });
  }

  formate(boolean, key) {
    const obj = {};
    obj[key] = true;
    this.error.push(boolean);
    return boolean ? null : this.setState(obj);
  }
  checkError() {
    this.formate(MessageCode(['chines'], this.state.user), 'userError');
    this.formate(MessageCode(['noContent'], this.state.company), 'companyError');
    this.formate(MessageCode(['chines'], this.state.industry), 'industryError');
    this.formate(MessageCode(['chines'], this.state.region), 'regionError');
  }
  postData() {
    this.setState({
      wait: true,
    });
    const data = Object.assign({}, this.state);
    fetch(`${localServer.name}/userInfor`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          this.state
        )
      })
      .then((response) => response.json())
      .then((responseData) => {
        const result = responseData.data;
        if (Number(result.affectedRows) > 0) {
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
  saveData() {
    realm.saveData('User', {
      uid: this.state.uid,
      name: this.state.user,
      phone: this.state.phone,
      company: this.state.company,
      industry: this.state.industry,
      region: this.state.region
    });
  }
  submitInfor() {
    let error = true;
    this.error.length = 0;
    this.checkError();
    for (let i = 0; i < this.error.length; i++) {
      console.log(this.error[i]);
      if (!this.error[i]) {
        return error = false;
      }
    }
    return error ? this.postData() : null;
  }

  render() {
    return (
      <View style={Form.Container}>
          <FormLabel labelStyle ={Form.lable}>姓名:</FormLabel>
          <View>
              <FormInput containerStyle={Form.InputContainer} inputStyle={Form.InputStyle}   onChangeText={(text)=>{this._onChangeText('user',text,{userError:false})}} underlineColorAndroid="transparent" maxLength={5} defaultValue=''/>
              <Icon containerStyle={Form.FormIcon} type={Form.IconType} name='user'  color={Form.InputIconColor} size={Form.IconSize}  />
              { this.state.userError ? <View style={Form.errorAlert}><Icon
              name='exclamation-circle'type={Form.IconType} color={Form.errorIconColor} size={Form.errorIconSize}/><Text style={Form.errorText}>必须为中文字符</Text></View> : null }
          </View>

          <FormLabel labelStyle ={Form.lable}>公司名称:</FormLabel>
          <View>
              <FormInput  containerStyle={Form.InputContainer} inputStyle={Form.InputStyle} onChangeText={(text)=>{this._onChangeText('company',text,{companyError:false})}} underlineColorAndroid="transparent" maxLength={15} defaultValue=''/>
              <Icon containerStyle={Form.FormIcon} type={Form.IconType} name='building' size={Form.IconSize}   color={Form.InputIconColor} />
              { this.state.companyError ? <View style={Form.errorAlert}><Icon
              name='exclamation-circle'type={Form.IconType} color={Form.errorIconColor} size={Form.errorIconSize}/><Text style={Form.errorText}>请填写正确的公司名称</Text></View> : null }
          </View>


          <FormLabel labelStyle ={Form.lable}>所属行业:</FormLabel>
          <View>
              <FormInput  containerStyle={Form.InputContainer} inputStyle={Form.InputStyle} onChangeText={(text)=>{this._onChangeText('industry',text,{industryError:false})}} underlineColorAndroid="transparent"maxLength={10} defaultValue=''/>
              <Icon containerStyle={[Form.FormIcon,{left:32}]} type={Form.IconType} name='graduation-cap' size={16}  color={Form.InputIconColor} />
              { this.state.industryError ? <View style={Form.errorAlert}><Icon
              name='exclamation-circle'type={Form.IconType} color={Form.errorIconColor} size={Form.errorIconSize}/><Text style={Form.errorText}>必须为中文字符</Text></View> : null }
          </View>

          <FormLabel labelStyle ={Form.lable}>所属地区:</FormLabel>
          <View>
              <FormInput containerStyle={Form.InputContainer} inputStyle={Form.InputStyle} onChangeText={(text)=>{this._onChangeText('region',text,{regionError:false})}} underlineColorAndroid="transparent" maxLength={10} defaultValue=''/>
             <Icon containerStyle={Form.FormIcon} type={Form.IconType} name='globe'  color={Form.InputIconColor} size={Form.IconSize}  />
             { this.state.regionError ? <View style={Form.errorAlert}><Icon
              type={Form.IconType} name='exclamation-circle' color={Form.errorIconColor} size={Form.errorIconSize}/><Text style={Form.errorText}>必须为中文字符</Text></View> : null }
          </View>
          <View style={styles.buttonWarp}>
              <Button title='提交注册' borderRadius={4} buttonStyle={styles.buttonStyle} onPress={this.submitInfor} /> 
              <Button title='稍后填写' borderRadius={4} buttonStyle={styles.buttonStyle} onPress={this.leavePage} />        
          </View>
          {this.state.wait ? <Progress/> : null}        
        </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#ec082e',
    marginTop: 10
  },
  buttonWarp: {
    marginTop: 15
  }
})


export default Registered;