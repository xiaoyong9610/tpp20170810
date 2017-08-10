require("../css/index.css");
//监听socket传来的信息
require("jquery");
var socket = io.connect();
socket.on('reload',function(){
	//刷新网页
	window.location.reload();
});
$("#myBtn").on("click",function(){
	var xingMing=$("#xingMing").val();
	var neiRong=$("#inp").val();
	socket.emit("btn2All",{xingMing:xingMing,neiRong:neiRong})
});
$("#myBtn2other").on("click",function(){
	var xingMing=$("#xingMing").val();
	var neiRong=$("#inp").val();
	socket.emit("btn2other",{xingMing:xingMing,neiRong:neiRong})
});
$("#myBtn2one").on("click",function(){
	var xingMing=$("#xingMing").val();
	var neiRong=$("#inp").val();
	socket.emit("btn2one",{xingMing:xingMing,neiRong:neiRong})
});
socket.on("msg2All",function(result){
	console.log(result.xingMing);
	console.log(result.neiRong);
	$("#content").append(result.xingMing+":"+result.neiRong+"<br>")
});
socket.on("msg2other",function(result){
	console.log(result.xingMing);
	console.log(result.neiRong);
	$("#content").append(result.xingMing+":"+result.neiRong+"<br>")
});
socket.on("msg2one",function(result){
	console.log(result.xingMing);
	console.log(result.neiRong);
	$("#content").append(result.xingMing+":"+result.neiRong+"<br>")
});
socket.on("addUser",function(result){
	$("#yonghu").empty();
	var userList=result.userList;
	var str="";
	for(var i=0;i<userList.length;i++){
		str+="<option value='"+userList[i].id+"'>"+userList[i].ip+"</option>"
	}
	$("#yonghu").append(str);
});