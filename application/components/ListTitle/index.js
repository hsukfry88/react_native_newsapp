/*公共列表标题*/
import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
export default class ListTile extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };
  constructor(props) {
    super(props);
  }
  onPressfn = () => {
    this.props.page()
  }
  render() {
    return (
      <TouchableOpacity onPress={this.onPressfn}>
        <View style={styles.titleWarp}>
            <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}
const styles = StyleSheet.create({
  titleWarp: {
    flex: 1,
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 13,
    marginTop: 5,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    color: '#ec082e',
  },
})