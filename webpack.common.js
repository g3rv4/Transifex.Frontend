const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.tsx',
        vendor: [
            'react',
            'react-dom',
            'axios',
            'lodash'
        ]
    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: "./src/index.ejs",
            chunks: ['manifest', 'vendor', 'index']
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ],

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.tsx?$/, 
                loaders: [
                    'react-hot-loader/webpack',
                    "awesome-typescript-loader"
                ]
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { 
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader" 
            },

            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }
        ]
    }
};
