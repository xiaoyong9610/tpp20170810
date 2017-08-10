var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var fs=require("fs");
function getEntry(files){
	var entry={};
	for (var i=0;i<files.length;i++) {
		var name=files[i].substr(0,(files[i].length-5));
		entry[name]="./src/js/"+name+".js";
	}
	return entry;
}
function getHtmlPlugins(entry){
	var htmlPluginObjs=[new ExtractTextPlugin("css/[name].css")]
	for(item in entry){//直接拿出json格式数据的key
		console.info(item)
		htmlPluginObjs.push(new htmlWebpackPlugin({
			filename:"../views/"+item+".html",//本来要输出到public里 现在我们调到views里 所以路径是接着public来的
			template:"./src/template/"+item+".html",
			chunks:[item]
		}))
	}
	return htmlPluginObjs;
}
var files=fs.readdirSync(__dirname+"/src/template");
var entry=getEntry(files);
var htmlPluginObjs=getHtmlPlugins(entry);

module.exports = {
	entry:entry,
//	{index:__dirname+"/src/js/index.js"},
	output:{
		path:__dirname+"/public",
		filename:"js/[name].js",
		publicPath:"http://192.168.0.32:3000"
	},
	module:{
		rules:[
			{
		        test: /\.css$/,
		        use: ExtractTextPlugin.extract({
		          fallback: "style-loader",
		          use: "css-loader!postcss-loader"
		        })
		    },
			//生成的html文件需要通过html的loader来加载才能不出问题
			{
				test:/\.html$/,
				loader:'html-loader'
			},
			{ test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader'},
			//通过expose-loader将jquery组建暴露到全局变量中
			{ 
				test: require.resolve("jquery"), 
				//将jquery引用并且取变量名叫 jQuery或者$
				loader: "expose-loader?jQuery!expose-loader?$" 
			}
		]
	},
	plugins:htmlPluginObjs
//	plugins:[
//		new ExtractTextPlugin("css/[name].css"),
//		new htmlWebpackPlugin({
//			//生成的html网页的名字,可以在里面写部分的路径
//			//默认路径是按照上面的output中的path来决定的
//			filename:'../views/index.html',
//			//html文件的来源,也就是根据哪个文件来生成对应的网页
//			template:'./src/template/index.html',
//			//生成的网页中引用的外部依赖文件的模块是哪个
//			//这里要填写entry中json文件中的key值
//			chunks:['index']
//		})
//	]
}