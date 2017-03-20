var path = require("path");

module.exports={
    // 项目入口
	entry:  "./src/pages/app.js",
    // 打包文件输出路径
	output: {
		path: path.join(__dirname,"./public/js"),
		filename: "bundle.js",
	},
	module: {
        loaders: [{
        	test: /\.js$/, 
        	loader: "babel-loader",
        	query: {
        		presets: ['react','es2015']
        	}
        },{
        	test: /\.jsx$/,
        	loader: 'babel-loader', 
        	query: {
        		presets: ['react', 'es2015']
        	}
        },{
        	test: /\.css$/, 
        	loader: "style!css"
        },{
        	test: /\.(jpg|png|otf)$/, 
        	loader: "url?limit=8192"
        },{
        	test: /\.scss$/,
        	loader: "style!css!sass"
        }]
    }
};