const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        path: path.join(__dirname, "dist/"),
        filename: "js/main.js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
    ],
    module: {
        rules: [{
                test: /\.ts$/,
                loader: [
                    { loader: 'template-string-optimize-loader' },
                    { loader: "awesome-typescript-loader" }
                ]
            }
        ]
    },
    optimization: {
        minimize:true,
        minimizer: [
          new TerserPlugin({
            extractComments: 'all'
          }),
        ],
      },
};