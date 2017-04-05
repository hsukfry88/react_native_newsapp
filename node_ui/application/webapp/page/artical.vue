<template>
	<div class="container">
		<div class="top">
			<div class="title">{{title}}</div>
			<span class="push-time">发布时间:{{timer}}</span>
			<span class="push-author">发布人:{{issuer}}</span>
		</div>
		<div v-html="renderPage"></div>
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	export default {
		data(){
			return {
				timer:'',
				title:'',
				issuer:'',
			}
		},
		computed:mapState({
				renderPage:state=>state.newModel.content
		}),
		created(){
			window.onscroll=null;
			const id=this.$route.query.id;
			const query=this.$route.query
			query.timer=query.timer.split("T");
			query.timer=query.timer[0];
			for(let key in query){this[key]=query[key]}
			window.scrollTo(0,0)//滚动条置顶
			const request=`https://bxs.ghspace.cn/artical/${id}`;
			this.$store.dispatch('loaderContent',request);	
		},

	}
</script>