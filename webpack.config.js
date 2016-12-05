var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = [{
		entry: "./src/client/entry.es6",
		output: {
			path: "dist/public",
			filename: "bundle.js"
		},
		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery',
				//'Vel': 'velocity-animate'
			}),
			new HtmlWebpackPlugin({
				title: "Custom Templating Using Pug",
				template: './src/client/index.pug',
				inject: 'body'
			})
		],
		module: {
			loaders: [{
				test: /\.es6$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel', // 'babel-loader' is also a valid name to reference
				query: {
					presets: ['es2015']
				}
			}, {
				test: /\.pug$/,
				loader: 'pug',
			}, {
				test: /\.css$/,
				loader: 'style!css'
			}, {
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file'
			}]
		},
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.js'
			}
		}
	},

	{
		entry: "./src/viewer/entry.es6",
		output: {
			path: "dist/public",
			filename: "viewbundle.js"
		},
		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery',
				//'Vel': 'velocity-animate'
			}),
			new HtmlWebpackPlugin({
				title: "Custom Templating Using Pug",
				template: './src/viewer/view.pug',
				inject: 'body',
				filename: "view.html"
			})
		],
		module: {
			loaders: [{
				test: /\.es6$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel', // 'babel-loader' is also a valid name to reference
				query: {
					presets: ['es2015']
				}
			}, {
				test: /\.pug$/,
				loader: 'pug',
			}, {
				test: /\.css$/,
				loader: 'style!css'
			}, {
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file'
			}]
		},
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.js'
			}
		}
	}

];
