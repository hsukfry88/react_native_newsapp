/*申报公告*/
import React, {
	Component
} from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import {
	ListItem
} from 'react-native-elements';
import {
	Color
} from '../../../config/theam';
import {
	Actions
} from 'react-native-router-flux';
import ListTile from '../../ListTitle';

const AnnouncementList = ({
	dataSource,
	listTitle,
}) => {

	return (
		<View>
	 <ListTile title={listTitle} page={()=>Actions.AnnouncementList({title:listTitle,length:15})}/>
	 <View style={{backgroundColor:Color.white,marginTop:5}}>
			{
				dataSource.map((item,i)=>{
					return <ListItem
		        key={i}
		        title={item.title}
		        titleStyle={{fontSize:14,color:'#666'}}
		        onPress={
		        	() =>Actions.AnnounceOrder({
		        		id:item.id,
					  		title:item.title,
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