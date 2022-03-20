const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const devtool = process.argv.mode === "development" ? "eval-cheap-source-map" : false;

const postcssPresetEnv = require("postcss-preset-env");

const postcssLoader = {
    loader: "postcss-loader",
    options: {
        postcssOptions: {
            plugins: [postcssPresetEnv()],
        },
    },
};

module.exports = {
    devtool: devtool,
    entry: "./src/index.js",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "build"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", postcssLoader],
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" }), new MiniCssExtractPlugin()],
    optimization: {
        minimizer: [new CssMinimizerPlugin(), "..."],
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
};
