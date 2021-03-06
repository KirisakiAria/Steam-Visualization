'use strict'

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {

	devtool: 'cheap-module-source-map',

	devServer: {
		contentBase: path.resolve(__dirname, '../src'),
		historyApiFallback: true,
		inline: true,
		port: 8080
	},

	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
		}]
	},

	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.js',
			'vue-router': 'vue-router/dist/vue-router.js'
		}
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new webpack.ProvidePlugin({
			Vue: 'vue',
			VueRouter: 'vue-router'
		}),
		new FriendlyErrorsWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			}
		})
	]
});

module.exports = webpackConfig;