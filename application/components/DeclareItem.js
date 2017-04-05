import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  List,
  ListItem
} from 'react-native-elements';
import {
  Color
} from '../config/theam';
import {
  Actions
} from 'react-native-router-flux';
const DeclareItem = ({
  items,
  listTitle
}) => {
  return (
    <View style={{backgroundColor:Color.graye}}>
		 		<View style={[styles.titleWarp,{marginTop:10}]}>
		 			<Text style={styles.title}>{listTitle}</Text>
		 		</View>
		 		<View style={{backgroundColor:Color.white,marginTop:10}}>
					{
						items.map((item,i)=>{
							//let startdate=(item.startdate).split('T');
							return <ListItem
				        key={i}
				        title={item.title}
				        onPress={
                  () =>Actions.Detail({
                    title:'政策查询',
                    newsTitle:item.title,
                    createtime:item.createtime,
                    issuer:item.issuer,
                    content:item.content,
                    keywords:item.keywords,
                  })
                }
				      />
						})
					}
				</View>
		</View>)
}
const styles = StyleSheet.create({
  titleWarp: {
    flex: 1,
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    color: '#ec082e',
  },
})

export default DeclareItem;