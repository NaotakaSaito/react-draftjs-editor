const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: 'editor.bundle.js',
		library: 'EditorApp',
		globalObject: 'this',
		libraryTarget: 'umd',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	resolve: {
		extensions: [".ts", ".js", ".tsx", ".jsx"], //　コンパイルする言語指定
	},
	module: {
		rules: [{
			test: /\.(js|ts|tsx)$/,
			use: {
				loader: 'babel-loader',
			},
			exclude: /node_modules/,
			include: [
				__dirname,
				path.join(__dirname, 'src'),
			],
		}, {
			test: /\.(ts|tsx)$/,
			exclude: /node_modules/,
			include: [
				path.resolve(__dirname, 'src'),
			],
			use: {
				loader: 'ts-loader',
			}
		}, {
			test: /\.css$/,
			use: ["style-loader", "css-loader"]
		}, {
			test: /\.svg$/,
			use: [
				{
					loader: "babel-loader"
				},
				{
					loader: "react-svg-loader",
					options: {
						jsx: true // true outputs JSX tags
					}
				}
			]
		}],
	}
};
