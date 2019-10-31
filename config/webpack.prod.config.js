const merge = require("webpack-merge");
const uglifyJsPlugin = require("uglifyjs-webpack-plugin");
const optimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpackBaseConfig = require("./webpack.common.config");
module.exports = merge(
    webpackBaseConfig, {
        optimization:{
            minimizer:[
                new uglifyJsPlugin, new optimizeCSSAssetsPlugin
            ]
        }
    }
);
