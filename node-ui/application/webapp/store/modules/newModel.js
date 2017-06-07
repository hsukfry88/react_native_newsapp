import * as types from '../mutation-type';
import axios from 'axios';

const state={
		data:[],
		type:'',
		start:'',
		content:''
}
const getters={

}

const actions = {
	getPolicy({commit,state},requets){
		axios.get(requets.http).then((response)=>{
			const news=response.data;
			commit(types.RECEIVE_POLICY,{data:news.data,type:requets.type,start:requets.start});
		})
	},
	async loaderMore({commit,state},requets){
				requets=`${requets}/${Number(state.type)}/10/${Number(state.start)+15}`;
				let response = await axios.get(requets);
				const news=response.data;
				await commit(types.CONNACT_POLICY,news.data);
				return news.data.length==0?null:news.data.length;
	},
	loaderContent({commit,state},requets){
		axios.get(requets).then((response)=>{
				let news=response.data;
				news=news.data[0];
				let content=news.content;
				commit(types.SAVE_CONTENT,content);			
		})
	}
}
const mutations={
	[types.RECEIVE_POLICY](state,news){
		for(let key in news){state[key]=news[key]}
	},
	[types.CONNACT_POLICY](state,news){
		state.type=Number(state.type);
		state.start=Number(state.start+15);
		state.data=state.data.concat(news);
	},
	[types.SAVE_CONTENT](state,content){
		state.content=content;
	}
} 

export default {
	state,
	getters,
	actions,
	mutations
}