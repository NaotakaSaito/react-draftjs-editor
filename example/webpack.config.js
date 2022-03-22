const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { LoaderOptionsPlugin } = require('webpack');

module.exports = {
    mode: 'development',
    context: __dirname,
    devtool: 'inline-source-map',
    entry: [
        path.join(__dirname, 'src/index.tsx'),
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    cache: true,
    plugins: [
        new LoaderOptionsPlugin({
            debug: true
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        })
    ],
    resolve: {
        alias: {
            "react-draftjs-editor": path.join(__dirname, '..', 'src/index.tsx'),
        },
        extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
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
                path.join(__dirname, '..', 'src'),
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
        },
        {
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
        }
        ],
    },
};
