<template>
				<div class="header" v-show="toggle">
						<span @click="change('/policy',0,0)">宏观政策</span>
					  <span @click="change('/money',1,0)">资金扶持</span>
					  <span @click="change('/reduce',2,0)">减免减收</span>
					  <span @click="change('/qualification',3,0)">资质认证</span>
					  <span @click="change('/reader',4,0)">政策解读</span>
				</div>
				<!-- 路由出口 -->
				<!-- 路由匹配到的组件将渲染在这里 -->
				<router-view @click="hidden()"></router-view>
</template>
<script>
		export default{
			  name:'app',
			  data(){
			  	return{toggle:true,}
			  },
	  		methods:{
	  			change(link,type,start){
	  				//console.log(this.toggle);
	  				this.$router.push({ path:link, query: { type: type,start:start}})
	  			},
	  			prev(){
	  				this.$router.go(-1);
	  				//console.log(this.toggle);
	  			},
	  		}
		}
</script>
