const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: {
        app: './src/index.tsx',
    },
    output: {
        filename: 'editor.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx"], //　コンパイルする言語指定
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    // cssを出力するローダー
                    "style-loader",
                    // css をcommonJSに変換するローダー
                    "css-loader",
                ],
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",　// TSでトランスコンパイル
                include: path.resolve(__dirname, "src"),
                exclude: /node_module/,
            },
            {
                test: /\.(jpg|png)$/,　// 画像（jpg or png）を出力するローダー
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[contenthash].[ext]",
                            outputPath: "images",
                            publicPath: "/images",
                        },
                    },
                    "image-webpack-loader", //画像を圧縮
                ],
            },
        ],
    },
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
};
