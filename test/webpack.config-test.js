var nodeExternals = require('webpack-node-externals');

module.exports = {
	target: 'node', // in order to ignore built-in modules like path, fs, etc.
	externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
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
};
