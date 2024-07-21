const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main: "./src/client/js/main.js",
        videoPlayer: "./src/client/js/videoPlayer.js",
    },
    plugins: [new MiniCssExtractPlugin({
        filename: "css/style.css",
    })],
    mode: "development",
    watch: true,
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "assets"),
        clean:true, // 빌드시 폴더 삭제후 다시 빌드.
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", {
                                targets: "defaults"
                            }]
                        ],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],
            },
        ],
    },
};