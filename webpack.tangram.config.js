const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const perfAppConfig = {
    devtool: "source-map",
    mode: process.env.NODE_ENV || "development",
    entry: {
        tangram: "./tangramApp/index.ts"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "./dist/tangramApp"),

    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
            options: {
                onlyCompileBundledFiles: true,
                // use the main tsconfig.json for all compilation
                configFile: path.resolve(__dirname, "tsconfig.json")
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './tangramApp/index.html'
        }),
        new webpack.EnvironmentPlugin({
            // default NODE_ENV to development. Override by setting the environment variable NODE_ENV to 'production'
            NODE_ENV: process.env.NODE_ENV || "development"
        }),
    ],
    devServer: {
        publicPath: "/",
        host: "0.0.0.0",
        disableHostCheck: true,

    },
    stats: 'errors-only'
};

module.exports = perfAppConfig;
