const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  performance: {
    hints: false
  },
  entry: {
    app: resolve("src/main.ts"),
  },
  output: {
    path: resolve("dist"),
    filename: "js/[name].[hash].js",
    chunkFilename: "js/[name].[hash].js",
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".ts", ".tsx", ".mjs"],
    alias: {
      "@": resolve("src"),
    },
  },
  devServer: {
    port: 8088, // 端口号
    hot: true, // 热更新
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
        include: /(src)/,
      },
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          'sass-loader'
        ],
      }
    ],
  },
  plugins: [
    // vue-loader插件
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve("public/index.html"),
      favicon: resolve("public/favicon.ico"),
      inject: true,
    }),
    new ModuleFederationPlugin({
      name: 'base',
      remotes: {
        app1: 'app1@http://localhost:8089/remoteEntry.js',
        app2: 'app2@http://localhost:8090/remoteEntry.js',
      },
    }),
  ],
  

};
