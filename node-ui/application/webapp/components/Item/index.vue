
<template>
		<div class="item">
			<span>{{news}}</span>
			<span class="time">2017-10-09</span>
		</div>
</template>

<script>
	export default {
		name:"Item",
		props:['news','id'],
		data:function(){
			return {
				classObject:{
					item:true,
				}
		}
		}
	}
</script>