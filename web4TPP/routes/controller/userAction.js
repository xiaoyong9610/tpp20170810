var userAction=function(){
	this.userList=function(req,res){
		res.render("user");
	}
}
module.exports=new userAction();