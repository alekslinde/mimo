const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");

module.exports = {
  entry: "./src/assets/js/main.js",
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/assets/fonts", to: "./fonts", noErrorOnMissing: true },
        { from: "./src/assets/favicons", to: "./favicons", noErrorOnMissing: true },
        { from: "./src/php", to: "./php", noErrorOnMissing: true },
      ],
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
    new SpriteLoaderPlugin(),
  ],
  output: {
    filename: "[name].[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: {
            sources: {
              urlFilter: (attribute) => attribute !== "xlink:href",
            },
          },
        }],
      },
      {
        test: /\.svg$/,
        include: path.resolve("./src/assets/icons"),
        loader: "svg-sprite-loader",
        options: { extract: true },
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        exclude: [
          path.resolve("./src/assets/icons"),
          path.resolve("./src/assets/fonts"),
        ],
        type: "asset/resource",
        generator: { filename: "images/[name][ext]" },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        include: path.resolve("./src/assets/fonts"),
        type: "asset/resource",
        generator: { filename: "fonts/[name][ext]" },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              api: "modern",
              sassOptions: {
                style: "compressed",
                loadPaths: [path.resolve(__dirname, "node_modules")],
                quietDeps: true,
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    port: 8080,
  },
};
