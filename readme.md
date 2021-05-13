项目安装:
----------------------------------- 
	
	npm install 或使用yarn 

	新建mysql数据库导入sql文件
	
	编译node接口文件(因为es6你懂得)

	cd node-ui/application

	gulp build

	cd build && node app

	测试接口地址:localhost:3000/news

	node服务搭建成功后，启动react-native 

	react-native run-ios(ios环境)

	react0native run-android(android环境)


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







