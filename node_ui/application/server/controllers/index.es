// var router = require('koa-router')();
// var newsModel=require('../model/getNews');
import koaRouter from 'koa-router';
import jsonBody from 'koa-json-body';
import News from '../model/NewsModel';
import Declare from '../model/DeclareModel';
import Policy from '../model/PolicyModel';
import Artical from '../model/ArticalModel';
import Registered from '../model/Registered';
import moment from 'moment';
//import render from 'koa-swig';

const body=jsonBody();
const router=koaRouter();
const PolicyModel=  new Policy();
const ArticalModel= new Artical();
const NewsModel = new News();
const DeclareModel=new Declare();
const RegisteredModel= new Registered();


function TimeFormat(time,format){
		let result = moment(time,format).format().split('T');
		return result[0];
}
function CreatRouter(app){
		router.
			get('/index',async (ctx, next) => {
						//ctx.body='hello';
            await ctx.render('index.html', {title:'vue',
            });
            next();
        });
		/*首页接口*/
		router
		  .get('/news',async (ctx, next)=>{
		  	const newsData= await NewsModel.searchNews();
		  	const bannerData=await NewsModel.Banner();
		  	const hotPolicy=await PolicyModel.hotPolicy(10,0);
		  	ctx.body={data:newsData,banner:bannerData,hotPolicy:hotPolicy};
		  });
		/*文章详情*/
		router.
			get('/artical/:id',async(ctx,next)=>{
				const content=await ArticalModel.policyDetail('tb_policy',ctx.params.id);
				let list = await NewsModel.RelatedNews('tb_policy',content.keywords); 
				list.length!=0?list=list:list=false;
				let time=moment.utc(content.releasetime).format().split('T');
				await ctx.render('artical.html',{
						title:content.title,
						releasetime:time[0],
						issuer:content.issuer,
						content:content.content,
						list:list
				});
				next();
		});
		/*申报公告*/
		router.
			get('/announcement/:title/:id',async(ctx,next)=>{
				const announcement=await ArticalModel.applyDetail('tb_announcement',ctx.params.id);
				announcement.startdate=TimeFormat(announcement.startdate,'YYYY-MM-DD');
				announcement.enddate=TimeFormat(announcement.enddate,'YYYY-MM-DD');
				await ctx.render('announcement.html',{
						title:ctx.params.title,
						startdate:announcement.startdate,
						enddate:announcement.enddate,
						conditions:announcement.conditions,
				});
				// let list = await NewsModel.RelatedNews('tb_announcement',announcement.keywords); 
				//next();
		});
		/*申报公告列表*/ 
   	router.get('/announcementList/:num/:offset',async(ctx,next)=>{
				let params=ctx.params,
				data=await DeclareModel.SearchAll(params.num,params.offset);
				ctx.body={data:data};
		});
		 /*相关政策--相关申报*/
    router.get('/relatedNews/:keyword',async(ctx,next)=>{
    	const data = await NewsModel.RelatedNews(ctx.params.keyword); 
    	ctx.body={data:data};
    })
    /*政策查询*/
		router.get('/policy/:type/:num/:offset',async(ctx,next)=>{
					let params=ctx.params,
							data=await PolicyModel.SearchAll('tb_policy',params.type,params.num,params.offset);
				ctx.body={data:data};
		});
		/*提交政策收藏表单*/
		router.post('/form',body,async(ctx,next)=>{
				//console.log(ctx.request.body);
				const data=await DeclareModel.addItem('tb_declare',ctx.request.body);
				ctx.body=data;
				return data;
				//
		 });
		/*提交登陆手机号*/
		router.post('/loginInfor',body, async(ctx,next)=>{
				console.log(ctx.request.body);
				RegisteredModel.saveLoginStatus('tb_user',ctx.request.body);
		});
		/*提交用户信息接口*/
		router.post('/userInfor',body, async(ctx,next)=>{
				console.log(ctx.request.body);
				const date=await RegisteredModel.submitInfor('tb_user',ctx.request.body);
				ctx.body={data:date};
		});
		/*修改用户信息接口*/
		router.post('/updataInfor',body,async(ctx,next)=>{
				console.log(ctx.request.body);
				const date=await RegisteredModel.updataInfor('tb_user',ctx.request.body);
				ctx.body={data:date};			
			});
		router.get('/getStarDeclare/:id',async(ctx,next)=>{
				let params=ctx.params.id,
						data=await DeclareModel.starDeclare('tb_declare',params);
				ctx.body={data:data};
		})
		app
  	.use(router.routes())
  	.use(router.allowedMethods());
}
module.exports=CreatRouter;