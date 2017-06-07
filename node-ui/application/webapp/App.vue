<template>
		<div id="app">
				 <div class="header" v-show="toggle">
			      <span @click="change('/policy',0,0)">宏观政策</span>
			      <span @click="change('/money',1,0)">资金扶持</span>
			      <span @click="change('/reduce',2,0)">减免减收</span>
			      <span @click="change('/qualification',3,0)">资质认证</span>
			      <span @click="change('/reader',4,0)">政策解读</span>
			  </div>
			  <div class="prevBar" v-show="hidden"><span @click="change('return')">返回</span></div>
			  <router-view @click="hidden()"></router-view>
		</div>
</template>
<script>
		import invoke from 'react-native-webview-invoke/browser'
		export default{
			  name:'app',
			  data(){
			  	return{
			  		toggle:true,
			  		hidden:false,
			  	}
			  },
	  		methods:{
	  			change(link,type,start){
	  				link=='return'?this.$router.go(-1):this.$router.push({ path:link, query: { type: type,start:start}})
	  			},
	  			postNative(){
	  				return 'aaaaaa';
	  			}
	  		},
	  		watch:{
	  			'$route'(){
	  				if(this.$router.currentRoute.name == 'artical'){
	  					this.toggle=!this.toggle;
	  					this.hidden=!this.hidden;
	  				}else{
	  					this.toggle=true;
	  					this.hidden=false;
	  				}
	  			}
	  		},
	  		created(){
	  			
	  			// const  invoke = window.WebViewInvoke;
	  			invoke.default.define('test',function(){
	  				console.log('暴漏方法给NAtive');
	  				return '暴漏方法给NAtive';
	  			});
	  			var getFromNative = invoke.default.bind('get')
          var setToNative = invoke.default.bind('set')
          var webReady = invoke.default.bind('init');
          webReady().then(function(data){
          	console.log('5555555');
          	console.log(data);
          });
          console.log(invoke);
	  			//invoke.define('post', this.postNative);
	  		// 	console.log('postMessage');
	  		// 	 window.postMessage("Post message from web", "*");
	  		// 	 window.addEventListener("message", function(event) {
					//     console.log("Received post message", event);

					//     //logMessage(event.data);
					// }, false);
	  		}
		}
</script>
<style src="./assets/common.css"></style>