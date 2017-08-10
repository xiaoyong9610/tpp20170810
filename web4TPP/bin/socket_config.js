module.exports = {
	init:function(server){
		//加载socket通信组件来监听我们的服务器对象
		var io = require('socket.io').listen(server);
		var webpack=require("webpack");
		var webpackConfig=require("../webpack.config.js");
		var compiler=webpack(webpackConfig,function(err,stats){
			console.info(stats.toString({
				colors:true
			}))
			compiler.watch({},function(err,stats){
				console.info("更新成功");
				//通知所有的客户端刷新网页
				io.sockets.emit('reload');
			})
		});
		userList=[];
		userIp=[];
		//开始编辑对话
		io.on("connection",function(socket){//监听客户端连接,回调函数会传递本次连接的socket
			console.log("进来了");
			var user={};
			console.info(socket.id);
			console.info(socket.request.connection.remoteAddress);
			var id=socket.id;
			var ip1=socket.request.connection.remoteAddress;
			var ip=ip1.split(":")[ip1.split(":").length-1];
			console.log(ip);
			user.id=id;
			user.ip=ip;
			if(ip=="192.168.0.187"){
				user.role="manager"
			}else{
				user.role="client"
			}
			if(userIp.indexOf(ip)<0){
				userIp.push(ip);
				userList.push(user);
				io.sockets.emit("addUser",{userList:userList});
			}
			socket.on("btn2All",function(result){
				console.log("这是配置文件里的socket接到的内容"+result.xingMing+":"+result.neiRong);
				io.sockets.emit("msg2All",{xingMing:result.xingMing,neiRong:result.neiRong});//给所有客户端广播消息
			});
			socket.on("btn2other",function(result){
				//给其他客户端广播消息
				socket.broadcast.emit("msg2other",{xingMing:result.xingMing,neiRong:result.neiRong});
			});
			socket.on("btn2one",function(result){
				//给某个客户端广播消息
//				io.sockets.sockets[socketid].emit(msg2one, data);//给指定的客户端发送消息
			});
		})
	}
}
