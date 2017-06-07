'use strict';
import React, { Component} from 'react';
import { View} from 'react-native';
import InputGroup from '../InputGroup';

class FormComponent extends Component {
    render() {
        const {inputConfig, onInputChange, sendMessage} = this.props;
        return (
            <View>   
            {inputConfig.map((item, i) => {
                return (
                    <InputGroup key={i}  onChange={(text, err, names) => onInputChange(text, item.err, item.names)} sendMessage={sendMessage} status={item.status} {...item}/>
                )
            })}        
            </View>
        )
    }
}
export default FormComponent;