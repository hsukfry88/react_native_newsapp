import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  Actions
} from 'react-native-router-flux';
const Banner = ({
  dataSource
}) => {
  let Data = [{}];
  Object.assign(Data, dataSource);
  return (
    <View>
		<Swiper style={styles.wrapper} height={200}
          onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          dot={<View style={{backgroundColor: 'rgba(255,255,255,.7)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          paginationStyle={{
            alignItems:'flex-end',
            justifyContent:'center',
            bottom:10,
          }}  loop>
          {
          	Data.map((item,i)=>{
              let source='https://bxs.ghspace.cn/'+item.bannerfile;
              return <TouchableHighlight key={i}  onPress={
                            () =>Actions.PolicyDetail({
                              id:item.dataid,
                              title:item.name
                            })
                      }>
                      <Image  style={{height:265,resizeMode: Image.resizeMode.contain}} source={{uri:source}} 
                      />
                   </TouchableHighlight>
          	})
          }
     </Swiper>
    </View>
  )
}
var styles = {
  wrapper: {
    height: 200,
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
}

export default Banner;