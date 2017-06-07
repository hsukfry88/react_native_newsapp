// var Koa = require('koa');
// //var json = require('koa-json');
// const convert = require('koa-convert');
// const router =require('./controllers/index');
// const app = new Koa();
// router(app);

// app.listen(3000);


"use strict";

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _controllers = require('./controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _errorHandler = require('./Libs/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaJson = require('koa-json');

var _koaJson2 = _interopRequireDefault(_koaJson);

var _koaViews = require('koa-views');

var _koaViews2 = _interopRequireDefault(_koaViews);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _koaHistoryApiFallback = require('koa-history-api-fallback');

var _koaHistoryApiFallback2 = _interopRequireDefault(_koaHistoryApiFallback);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import siwg from 'siwg'

var app = new _koa2.default();
app.use((0, _koaConvert2.default)((0, _koaJson2.default)()));
console.log(_config2.default.get('viewDir'));
app.use((0, _koaViews2.default)(_config2.default.get('viewDir')));
(0, _controllers2.default)(app);
app.use((0, _koaConvert2.default)((0, _koaHistoryApiFallback2.default)()));
_errorHandler2.default.error(app); //处理页面错误的处理句柄

app.use((0, _koaConvert2.default)((0, _koaStatic2.default)(_config2.default.get('staticDir')))); // 静态资源文件


app.listen(3000);