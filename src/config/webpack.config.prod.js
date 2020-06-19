const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProd = process.env.NODE_ENV === "production";

module.exports = (env) => {
	return {
		entry: ["./src/templates/index.js"],
		mode: "production",
		output: {
			path: path.resolve(__dirname, "../../fe-dist"),
			publicPath: "/",
			filename: "[name]-bundle.js",
			chunkFilename: "[name].js",
		},
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
						},
					],
				},
				{
					test: /\.((s[c|a])|c)ss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
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
			new MiniCssExtractPlugin(),
			new OptimizeCssAssetsPlugin({
				assetNameRegExp: /\.css$/g,
				cssProcessor: require("cssnano"),
				cssProcessorOptions: { discardComments: { removeAll: true } },
				canPrint: true,
			}),
			new UglifyJSPlugin(),
			// new HtmlWebpackPlugin({
			// 	template: "./src/templates/index.html",
			// 	title: "Homepage",
			// }),
			new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: JSON.stringify(env.NODE_ENV),
				},
			}),
			new CompressionPlugin({
				algorithm: "gzip",
			}),
			new BrotliPlugin(),
		],
	};
};
