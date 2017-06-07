// import React, { PropTypes, Component} from 'react'
// import { View, Text, StyleSheet, TouchableHighlight,
// } from 'react-native';
// import { Icon} from 'react-native-elements';
// import normalize from '../helps/normalize';
// let styles
// const ListItem = ({title, line, onPress, onLongPress, containerStyle}) => {
//     let Component = onPress || onLongPress ? TouchableHighlight : View
//     return (
//         <Component
//         onLongPress={onLongPress}
//         onPress={onPress}
//         underlayColor = {
//         '#fff'
//         }
//         style={[styles.container, containerStyle && containerStyle]}>
//                              <View style={styles.wrapper}>
//                                      <View style={styles.titleSubtitleContainer}>
//                                              <Text numberOfLines={line} style={{
//             fontSize: 13 || normalize(13),
//             color: '#333'
//         }}>{title}</Text>
//                                </View>
//                                <View style={styles.chevronContainer}>
//                                    <Icon
//         type={'simple-line-icon'}
//         iconStyle={[styles.chevron]}
//         size={12}
//         name={ 'arrow-right'}
//         color={'#bdc6cf'}
//         />
//                                  </View>
//                              </View>

//      </Component>
//     )
// }
// styles = StyleSheet.create({
//     container: {
//         paddingLeft: 7,
//         paddingTop: 10,
//         paddingRight: 7,
//         paddingBottom: 10,
//         borderBottomColor: '#ededed',
//         borderBottomWidth: 1,
//         backgroundColor: 'transparent'
//     },
//     //chevronColor: '#bdc6cf',
//     wrapper: {
//         flexDirection: 'row',
//         marginLeft: 7,
//     },
//     titleSubtitleContainer: {
//         justifyContent: 'center',
//         flex: 1,
//     },
//     chevronContainer: {
//         flex: 0.05,
//         alignItems: 'flex-end',
//         justifyContent: 'center'
//     },
//     rightTitleContainer: {
//         flex: 1,
//         alignItems: 'flex-end',
//         justifyContent: 'center'
//     },
//     rightTitleStyle: {
//         marginRight: 5,
//         color: '#bdc6cf'
//     },
//     chevron: {}
// });
// export default ListItem;