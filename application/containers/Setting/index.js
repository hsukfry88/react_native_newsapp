'use strict';
import React, { Component} from 'react';

import { View, Text, TouchableOpacity} from 'react-native';
import { Button} from 'react-native-elements';
import { Actions} from 'react-native-router-flux';
import { CommonStyle, Setting} from '../../config/theam';
import SelectTitle from '../../components/ListTitle/selectTitle';
import Modal from 'react-native-root-modal';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loginState: realm.getData('Login')
        };
        this.cancelLogin = this.cancelLogin.bind(this);
        console.log(this.state.loginState);
    }
    cancelLogin() {
        realm.deletSchema('Login');
        this.setState({
            visible: false
        });
        Actions.init({
            type: 'replace'
        });
    }
    render() {
        return (
            <View style={Setting.bgGray}>

                    <Modal visible={this.state.visible}>
                        <View style={Setting.modalContainer}>
                                <View style={Setting.modalHeader}>
                                    <Text>退出</Text>
                                </View>
                            <View style={Setting.modalBody}>
                                <Text style={Setting.text}>退出后将不能为您保存账号信息,确认退出吗？</Text>
                            </View>
                            <View style={Setting.modalBottm}>
                                    <TouchableOpacity style={Setting.makeSure} onPress={this.cancelLogin}>
                                                <Text style={Setting.red}>确认</Text>
                                        </TouchableOpacity>
                                    <TouchableOpacity style={Setting.close}  onPress={this.hideModal}>
                                           <Text style={Setting.red}>取消</Text>
                                        </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>



                    <View style={Setting.container}>
                            <TouchableOpacity  onPress={Actions.UserInfo}>
                                <SelectTitle title={'个人信息'} onPress={Actions.UserInfo}/>
                            </TouchableOpacity>
                    </View>
                    <Button title='退出登录' onPress={this.showModal} borderRadius={CommonStyle.borderRadius} buttonStyle={CommonStyle.buttonStyle}/>
            </View>
        )
    }
    showModal = () => {
        console.log(111);
        this.setState({
            visible: true
        });
    };
    hideModal = () => {
        this.setState({
            visible: false
        });
    };
}

export default Container;