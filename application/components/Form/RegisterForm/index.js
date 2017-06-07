'use strict';
import React, { Component} from 'react';
import { View} from 'react-native';
import { Form, CommonStyle} from '../../../config/theam';
import InputComponent from '../InputGroup';

class FormComponent extends Component {
    render() {
        const {inputConfig, onInputChange} = this.props;
        const output = inputConfig.map((item, i) => {
            return (
                <InputComponent key={i} onChange={(text, err, names) => onInputChange(text, item.err, item.names)} {...item}/>
            )
        })
        return (
            <View>
                {output}
            </View>
        )
    }
}

export default FormComponent;