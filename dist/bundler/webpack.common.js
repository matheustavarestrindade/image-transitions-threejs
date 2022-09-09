var CopyWebpackPlugin = require("copy-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCSSExtractPlugin = require("mini-css-extract-plugin");
var path = require("path");
module.exports = {
    entry: path.resolve(__dirname, "../src/index.ts"),
    output: {
        hashFunction: "xxhash64",
        filename: "bundle.[contenthash].js",
        path: path.resolve(__dirname, "../dist"),
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: path.resolve(__dirname, "../static") }],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/index.html"),
            minify: true,
        }),
        new MiniCSSExtractPlugin(),
    ],
    module: {
        rules: [
            // HTML
            {
                test: /\.(html)$/,
                use: ["html-loader"],
            },
            // TS
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            // CSS
            {
                test: /\.css$/,
                use: [MiniCSSExtractPlugin.loader, "css-loader"],
            },
            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/images/[hash][ext]",
                },
            },
            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[hash][ext]",
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};
//# sourceMappingURL=webpack.common.js.map