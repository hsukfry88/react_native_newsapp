/*热门申报*/
import React, {
	Component
} from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import {
	Color
} from '../../../config/theam';
import {
	Actions
} from 'react-native-router-flux';
import ListTile from '../../ListTitle';
import ListItem from '../../ListItem';

const AnnouncementList = ({
	dataSource,
	listTitle,
}) => {

	return (
		<View>
	 <ListTile title={listTitle} page={()=>Actions.AnnouncementList({title:listTitle,length:15})}/>
	 <View style={{backgroundColor:Color.white,marginTop:10}}>
			{
				dataSource.map((item,i)=>{
					return <ListItem
						line={2} 
						key={i} 
						title={item.title}
		        onPress={
              () =>Actions.PolicyDetail({
              	id:item.id,
                title:item.title,
                newsTitle:item.title,
                createtime:item.createtime,
                issuer:item.issuer,
              })
            }
		      />
				})
			}
		</View>
	 </View>
	)
}
export default AnnouncementList;