/*公共列表标题*/
import React, { Component} from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { CommonStyle} from '../../config/theam';
const ListTitle = ({title, router}) => (
    <TouchableOpacity onPress={router}>
              <View style={CommonStyle.subTitle}>
                  <Text style={CommonStyle.subTitleColor}>{title}</Text>
              </View>
     </TouchableOpacity>
)
export default ListTitle;