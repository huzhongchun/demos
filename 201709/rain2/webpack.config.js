const webpack = require('webpack');

module.exports = {
	entry: [
		//'webpack-dev-server/client?http://localhost:10086',
		__dirname + '/src/main.js'
	],
	output: {
		filename: 'bundle.js',
		chunkFilename: '[name].[chunkhash:5].chunk.js',
		path: __dirname + '/public/dist/',
		publicPath: '',
	},
	devtool: 'source-map',
	// devtool: 'eval',
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: ['babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?import=false&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				loader: 'url-loader',
				options: {
					limit: 10000
				}
			}
		]
	},
	// externals: {
	//   'react': 'React',
	//   'react-dom': 'ReactDOM',
	//   'react-redux': 'ReactRedux',
	//   'react-router': 'ReactRouter',
	//   'react-router-dom': 'ReactRouterDOM',
	//   'react-router-redux': 'ReactRouterRedux',
	//   'redux': 'Redux',
	//   'redux-saga': 'ReduxSaga',
	// },
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"development"',
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	],
	externals: {
		// require("jquery") is external and available
		//  on the global var jQuery
		'$': 'jQuery',
		'_': '_',
	},
	devServer: {
		port: 10086,
		host: '0.0.0.0',
		hot: true,
		inline: true,
		historyApiFallback: {
			index: 'html/main.html'
		}
	}
};