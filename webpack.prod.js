const {merge} = require('webpack-merge') // webpack-merge
const common = require('./webpack.common.js') // 汎用設定をインポート
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common,{
	mode: 'production',
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: false, //falseでライセンスコメントを抽出し削除。 trueだと抽出したファイルを生成する
				terserOptions: {
					compress: {
						drop_console: true, //trueでconsole.logの削除
					},
				},
			}),
		],
	},
});
