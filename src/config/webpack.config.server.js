const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = {
	mode: "development",
	target: "node",
	entry: "./src/server/server.prod.js",
	output: {
		path: path.resolve(__dirname,"../../be-dist"),
		filename: "server.js",
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
						options: {
							emitFile: false,
						},
					},
				],
			},
			{
				test: /\.((s[c|a])|c)ss$/,
				use: [
					// {
					// 	loader: "style-loader",
					// },
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
	externals: [webpackNodeExternals()],
};
