const path = require('path');
const webpack = require('webpack');
const terserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        filename: 'bundle-[name].js',
        publicPath: path.resolve( __dirname, 'dist' )
    },
    mode: 'development',
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new terserPlugin({
            sourceMap: true
        })
    ]
}