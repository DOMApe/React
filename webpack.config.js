const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

let isProd = process.env.NODE_ENV === 'production';
let cssDev = ['style-loader', 'css-loader', 'sass-loader'];
let cssProd = ExtractTextWebpackPlugin.extract({
		fallback: 'style-loader',
		use: ['css-loader', 'sass-loader'],
		publicPath: '/dist'
});
let cssConfig = isProd ? cssProd : cssDev;

let config = {
	entry:'./src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
				// options: {
				// 	failOnWarning: false,
				// 	failOnError: false
				// }
      },
			{test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{test: /\.pug$/, use: 'pug-loader'},
			{test: /\.(sass|scss)$/,
				use: cssConfig
			},
			{
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
        use:
					'file-loader?name=[sha256:hash:12].[ext]&outputPath=img/&publicPath=img/'
			}
		]
	},
	devServer: {
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 9000,
	hot: true,
	open: true
},
	plugins: [
		// new webpack.LoaderOptionsPlugin({
    //         options: {
    //             eslint:
    //             {
    //                 failOnWarning: false,
    //                 failOnError: false,
    //                 fix: false,
    //                 quiet: false,
    //             },
    //         },
    //     }),
		new HtmlWebpackPlugin({
			title: 'React App',
			minify: {
				collapseWhitespace: true
			},
			hash: true,
			template: './src/index.pug'
		}),
		new ExtractTextWebpackPlugin({
			filename: 'styles.css',
			disable: !isProd,
			allChunks: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
};

module.exports = config;
