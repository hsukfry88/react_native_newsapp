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
				 <View style={{marginTop:5,backgroundColor:Color.white}}>
						{
							dataSource.map((item,i)=>{
								return (
									<ListItem title={item.title} line={2} key={i} onPress = {
										() => Actions.Announcement({
											id: item.id,
											title: item.title
										})
									}/>
								)
							})
						}
					</View>
		</View>
	)
}
export default AnnouncementList;