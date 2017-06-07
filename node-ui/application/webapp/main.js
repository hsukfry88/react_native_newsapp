import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueRouter from 'vue-router';
import policy from './page/policy.vue';
import money from './page/money.vue';
import reduce from './page/reduce.vue';
import qualification from './page/qualification.vue';
import reader from './page/reader.vue';
import artical from './page/artical.vue';

Vue.use(VueRouter)
const routes = [
  { path:'/index',name:'index',component:policy},
  { path: '/policy',name:'policy', component: policy },
  { path: '/money',name:'money', component: money },
  { path: '/reduce',name:'reduce', component: reduce },
  { path: '/qualification',name:'qualification', component: qualification},
  { path:'/reader',name:'reader',component:reader},
  { path:'/artical',name:'artical',component:artical,name:'artical'},
]
const router = new VueRouter({
	routes,
	mode:"history",
})

new Vue({
	store,
	router,
  render: h => h(App)
}).$mount('#app')
