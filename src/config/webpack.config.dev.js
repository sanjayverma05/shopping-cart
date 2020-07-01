const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: ["webpack-hot-middleware/client?reload=true", "./src/templates/index.js"],
	mode: "development",
	output: {
		path: path.resolve(__dirname, "../../dist"),
		publicPath: "/",
		filename: "[name]-bundle.js",
		chunkFilename: "[name].js",
	},
	devServer: {
		contentBase: "dist",
		overlay: true,
		hot: true,
		stats: {
			colors: true,
		},
	},
	devtool: "eval-source-map",
	optimization: {
		splitChunks: {
			name: false,
			chunks: "all",
			cacheGroups: {
				vendor: {
					name: "vendor",
					chunks: "initial",
					test: /node_modules/,
					priority: 20,
				},
				common: {
					name: "common",
					minChunks: 2,
					chunks: "async",
					priority: 10,
					reuseExistingChunk: true,
					enforce: true,
				},
			},
		},
		runtimeChunk: false,
	},
	resolve: {
		alias: {
			Components: path.resolve(__dirname, "../components/"),
			Styles: path.resolve(__dirname, "../styles/"),
			Templates: path.resolve(__dirname, "../templates/"),
			CoreComponents: path.resolve(__dirname, "../core"),
			Utility: path.resolve(__dirname, "../utility"),
			Stores: path.resolve(__dirname, "../stores"),
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.(woff2|woff|eot|svg|ttf)$/,
				use: [
					{
						loader: "file-loader",
						// options: {
						//     name: 'fonts/resources/[name].[ext]',
						//     useRelativePath: false
						// }
					},
				],
			},
			{
				test: /\.((s[c|a])|c)ss$/,
				use: [
					{
						loader: "style-loader",
					},
					// {
					//     loader: MiniCSSExtractPlugin.loader
					// },
					{
						loader: "css-loader",
					},
					{
						loader: "postcss-loader",
					},
					{
						loader: "sass-loader",
					},
					{
						loader: "sass-resources-loader",
						options: {
							resources: ["./src/styles/variables.scss", "./src/styles/mixins.scss"],
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/templates/index.html",
			title: "Homepage",
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
};
