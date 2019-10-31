const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebPackPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: {
        main: "./src/index.js"
    },
    output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "../dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Calculator",
            template: "./src/index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: "style.[chunkhash].css"
        }),
        new CopyWebPackPlugin([{from: "./src/assets/images", to: "assets/images"}])
    ],
    module: {
        rules: [
            {
                test:[/.(js|jsx)$/],
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ]
                    }
                }
            },
            {
                test:[/.css$|.scss$/],
                use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
                "postcss-loader" 
                ]
            },
            {
                test: /\.(jpg|svg|png|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            output: "[name].[ext]",
                            outputPath: "assets/images"
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    }
}