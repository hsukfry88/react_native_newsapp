// var Koa = require('koa');
// //var json = require('koa-json');
// const convert = require('koa-convert');
// const router =require('./controllers/index');
// const app = new Koa();
// router(app);

// app.listen(3000);


"use strict"
import babel from 'babel-polyfill';    
import Koa from 'koa';
import Router from './controllers';
import errorHandler from './libs/errorHandler';
import convert from 'koa-convert';
import json from 'koa-json';
import views from 'koa-views';
import serve from 'koa-static';
import config from './config';
import historyApiFallback from "koa-history-api-fallback";
import co from 'co';
import render from 'koa-swig';
//import siwg from 'siwg'

const app = new Koa();
app.use(convert(json()));
console.log(config.get('viewDir'));

app.use(views(config.get('viewDir'),{
		map:{
        html: 'swig'
    }
}));
app.context.render = co.wrap(render({
  root: config.get('viewDir'),
  cache:false,
  allowErrors: false,   
  autoescape: true,
  encoding: 'utf8',
  ext: 'html',
}));
app.use(convert(serve(config.get('staticDir')))); // 静态资源文件
Router(app);
app.use(convert(historyApiFallback()));
errorHandler.error(app); //处理页面错误的处理句柄




app.listen(3000);