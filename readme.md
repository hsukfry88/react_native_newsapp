项目安装:
===================================
	### 
			新建mysql数据库导入sql文件
	 		npm install 或使用yarn 
===================================

	[点击这里可以看到demo](https://pan.baidu.com/s/1c90xRK)

项目架构说明:
------------------------------
* application(应用)
	* components(组件)
	* config(配置文件)
	* images(静态图片资源)
	* pages(视图页面)
	* realm(对realm操作的一些封装)
	* tool(一些工具函数，中断Promise)

	
* node_ui(用于接收网络接口)
	* application
		* config(打包路径配置文件)
		* server(node中间层)
			* |config(node配置文件)
			* controlles(路由接口控制器)
			* model(数据模型)
			* libs(静态资源库)
			* build编译后的生产环境
			* app.es入口文件
			* gulpfile编译es6代码
		* webapp（当时想尝试利用vue实现搜索页面spa通过webview嵌入应用，后来发现在控制返回键和页面操作上还是不方便，放弃了）
使用了vuex+vue-router+webpack2+vue-cli
store(vuex的状态管理机制)



用到的组件:（感谢这些无私奉献的开发者们）
---------------------
<ul>
<li>react-natice-elements(有些UI交互元素还是挺好用的)</li>
<li>react-native-swiper(轮播图)</li>
<li>react-native-router-flux控制路由，后期将引入redux</li>
<li>react-native-pull(作者在listView上做了一层封装的列表，还是很好用的)</li>
</ul>

介绍和总结:
-----------------------------------------------------------------
政策百晓生app全部基于react-native框架开发，网络通信基于node的koa2提供数据接口

在创业公司没有ios/android开发工程师，但要节省开支，这个重任交付到本人头上，在一路爬坑中，也算是把这个1.0版做出来，供跟我刚开始涉足移动端的朋友们一起学习，欢迎大神指导，别喷我，项目全由一人完成，时间紧任务急。

技术选型：目前流行的移动端app框架最老的phoneGap,发展到Cordova,国人现在的hybrid,APICLOUD，Angular ionic,React-Native还有...优略好坏，只是看我们适应的场景和业务，我一年前尝试用过hybrid开发过一个小应用，但用户体验确实不太好，白屏和性能，样式确实都有点小不爽，选择了React-native最大的感觉确实能达到原生的性能，感觉代码覆盖率在85-90%都是能用在跨端的，比较也是facebook的大厂的神器，总归用起来还是比较爽的。

后端采用node做中间层，因为node得天独厚单线程，异步事件机制，再加上产品也没什么太复杂的业务计算逻辑，能够快速实时响应请求。使用koa2框架让中间件更干净，不像express附加很多中间件

ios必须要支持https协议，在给我们的node配nginx反向代理时记得配置

本地缓存数据库:realm性能好，速度快，尺寸适中，缺点是想要这玩意，大兄弟你必须要翻墙，在启动项目时你必须要网络环境好才能下载完成realm的编译包，否则你是崩溃，Mac有个Realm Browser可视化工具方便查看（但不能和模拟器同时启动）

在网络请求上Promise机制下，在我们路由跳转下是不没有断开请求的，也就是我们为什么总看到waring的那讨厌的黄色，我们人为干预一下取消请求还是很有必要的，
在视图中我们要避免组件嵌套组件和少使用动画效果，这样会造成卡顿，在路由跳转时不需要的视图最好把它replace掉






