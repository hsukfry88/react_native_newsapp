<template>
  <div class="listview">
      <div v-for="(item, index) in newsList" class="row">
         <router-link :to="{name: 'artical',query:{id:item.id,title:item.title,issuer:item.issuer,timer:item.createtime}}"><Item :news="item.title" :id="item.id"></Item></router-link>
      </div>
      <div class="loader-alert">
          <span data-loader="circle-side" v-bind:class="{hide:show}"></span>
          <span>{{statebar}}</span>
      </div>
  </div>
</template>
<script>
  import Item from '../Item/index.vue';
  import {mapState } from 'vuex';
  import scroller from '../scroller/index';
  export default {
    data(){
      return {
        type:2,//初始化新闻类型
        start:0,//默认起始条数
        len:15,//文章长度
        http:'https://bxs.ghspace.cn/policy',
        statebar:'加载中...',
        show:false,
        refresh:true,
      }
    },
    components: {
      Item,
    },
    computed:mapState({
      newsList:state=>state.newModel.data,
    }),
    methods: {
      GetQueryString(name){
           var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
           var r = window.location.search.substr(1).match(reg);
           if(r!=null)return  unescape(r[2]); return null;
      },
      posthttp(type,start){
        let len=this.len;
        type==null?type=this.type:type;
        let http=`${this.http}/${type}/${len}/${start}`;
        this.$store.dispatch('getPolicy',{http:http,start:start,type:type});
      },
      scrollfn(){
        return (scroller.getScrollTop() + scroller.getWindowHeight())>(scroller.getScrollHeight()-20)? this.startLoader(): null;
      },
      startLoader(){
        if(this.refresh){
          this.refresh=!this.refresh;
          this.loaderMore();
        }
      },
      loaderMore(){
        let vm=this;
        this.$store.dispatch('loaderMore',this.http)
        .then(function(result){
          if(result==null){
            window.onscroll=null;
            vm.show=!vm.show;
            vm.statebar='没有更多了';
          }else{
            vm.refresh=!vm.refresh;
          }
        })
      },
    },
    created:function(){
      let vm=this;
      let data=this.$data;
      let type=this.GetQueryString('type');
      let start=data.start;     
      this.posthttp(type,start);
      window.scrollTo(0,0)//滚动条置顶
      window.onscroll = this.scrollfn;
    }
  }
</script>



