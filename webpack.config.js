const path = require('path');
const webpack = require('webpack');
const ConcatPlugin = require('webpack-concat-plugin');
const HtmlWebpack = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const concatFiles = [
	'./src/registry.js',
	'./src/editor.js'
]

const concatPlugin = new ConcatPlugin({
	uglify: false,
	sourceMap: false,
	name: 'concat-test',
	outputPath: '',
	fileName: '[name].js',
	filesToConcat: [...concatFiles],
	injectType: 'append'
});

module.exports = {
	mode: 'development',
	entry: {
		'bundle': './src/bundle.js'
	},
	output: {
		filename: '[name].[hash:8].js',
		path: path.resolve(__dirname, './dist/'),
		// 如果使用libraray，使用下面的配置（expose-loader不需要）
		//将你的 library 暴露为所有的模块定义下都可运行的方式
		// libraryTarget: 'umd', 
		// library: 'concatLib'
	},
	devServer: {
		contentBase: './dist',
		host: 'localhost',
		port: 3000,
		open: true,
		hot: true,
	},
	module: {
		rules: [{
			test: '/src/utils/util.js',
			use: [{
				loader: 'expose-loader',
				options: 'util'
			}]
		}, {
			test: require.resolve('jquery'),
			use: [{
				loader: 'expose-loader',
				options: '$'
			}]
		}]
	},
	plugins: [
		new HtmlWebpack({
			template: './src/index.html'
		}),
		new CleanWebpackPlugin(),
		concatPlugin  // 注意顺序，concat在HtmlWebpack之后，才能同时把两个脚本注入html
	]
}