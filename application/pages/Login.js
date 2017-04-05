/*登录页面*/
'use strict';
import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
} from 'react-native';
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Icon,
} from 'react-native-elements';
import {
  MessageCode,
  Validation
} from '../components/phoneForm/validation';
import {
  Margin,
  theam,
  ScrollBottom,
  Color,
  Form
} from '../config/theam';
import {
  Actions
} from 'react-native-router-flux';
import LoginStorage from '../components/Storage/LoginStorage';
import md5 from 'md5';
import moment from 'moment';
import Progress from '../components/progress';
const time = moment().format('YYYY-MM-DD');
const storageModel = new LoginStorage();
let setTimeFn;
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
    let md5str = `${this.state.phone}${time}md5`;
    md5str = md5(md5str);
    console.log(md5str);
    return md5str;
  }
  async postFetch() {
    try {
      const code = this.Mademd5();
      const http = `http://localhost/${this.state.phone}/${code}`;
      //console.log(http);
      const response = await fetch(http, {
        method: 'POST',
        headers: {
          "Content-Type": "text/plain"
        }
      });
    } catch (error) {
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
          const http = `http://localhost/${this.state.phone}/${this.state.messageCode}/${code}`;
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
            console.log('验证码或手机号错误');
            this.setState({
              messageError: '验证码或手机号错误'
            })
          }
        } catch (error) {
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
      <View style={{marginTop:60,backgroundColor:Color.graye,flex:1}}>
          
          <View style={{alignItems:'center',justifyContent:'center'}}>
              <Image source={require('../images/logo.png')} style={{width:60,height:60,margin:20}}/>
          </View>
          
          <FormLabel labelStyle ={Form.lable}>手机号:</FormLabel>
          <View>
              <FormInput inputStyle={Form.InputStyle} containerStyle={Form.InputContainer}   underlineColorAndroid="transparent" onChangeText={(text)=>{this._onChangePhoneText(text)}}
              keyboardType={'numeric'}/>
              <Icon containerStyle={Form.InputIcon} type='font-awesome' name='user'  color='#ccc' size={Form.IconSize}  />
          </View>
          {this.state.phoneError!=''? <Text style={styles.alert}>{this.state.phoneError}</Text>:null}


          <FormLabel labelStyle ={Form.lable}>验证码:</FormLabel>
          <View  >
            <View>
              <FormInput keyboardType={'numeric'}  inputStyle={Form.InputStyle} containerStyle={Form.InputContainer}   underlineColorAndroid="transparent" onChangeText={(text)=>{this._onChangeMessageText(text)}}/>
              <Button title={this.state.messageBtn} fontSize={14} color={'#999'} buttonStyle={{borderWidth:1,borderColor:'#eaeaea',width:150,position:'absolute',height:40,right:10,top:Platform.OS==='ios'?-40:0}} backgroundColor={'#fff'}  onPress={this._sendMessage} disabled={this.messageStatus} disabledStyle={{backgroundColor:'#fafafa',borderColor:'#eaeaea',borderWidth:1,}}/>
            </View>
            <Icon containerStyle={Form.InputIcon} type='font-awesome' name='lock'  color='#ccc' size={Form.IconSize}  />

          </View>




          {this.state.messageError!=''? <View style={{marginLeft:15,marginTop:10,flexDirection:'row'}}><Icon
              name='exclamation-circle'type='font-awesome' color='#ec082e' size={14}/><Text style={styles.alert}>{this.state.messageError}</Text></View>:null}
          <View>
          <Button title='登录' borderRadius={4} buttonStyle={styles.buttonStyle} onPress={this.postValidation} />   
          </View>  
          {this.state.wait ? <Progress/>: null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  alert: {
    margin: 15,
    color: '#ec082e'
  },
  buttonStyle: {
    backgroundColor: '#ec082e',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  buttonWarp: {
    marginTop: 15
  }
});
export default Login;