import Vue from 'vue';
import Vuex from 'vuex';
import newModel from './modules/newModel';

Vue.use(Vuex);
export default new Vuex.Store({
		modules:{
			newModel:newModel
		}
})