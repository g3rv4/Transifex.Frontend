const merge = require('webpack-merge');
const dev = require('./webpack.dev.js');
const webpack = require('webpack');
const _ = require('lodash');

let merged = merge(dev, {
    entry: {
        index: './src/index-hot.tsx',
    },
    devServer: {
        hot: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});

// add react-hot-loader to the entries + to the vendor
_.forOwn(merged.entry, function(v, k){
    if(k == 'vendor') {
        merged.entry[k].push('react-hot-loader');
    } else {
        if(_.isArray(v)){
            merged.entry[k].unshift('react-hot-loader/patch');
        } else {
            merged.entry[k] = ['react-hot-loader/patch', v];
        }
        
    }
});

module.exports = merged;