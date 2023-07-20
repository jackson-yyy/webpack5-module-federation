const path = require("path");
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const isProd = process.env.NODE_ENV === 'production';
const isMulti = process.env.BUILD_MODE === 'multi';

function getRemoteUrl (name, productionHost, devPort) {
  return isProd ? `${name}@${productionHost}/remoteEntry.js` : `${name}@http://localhost:${devPort}/remoteEntry.js`
}

module.exports = {
  mode: process.env.NODE_ENV,
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
    publicPath: '/'
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
        app1: getRemoteUrl('app1', isMulti ? 'http://mf-multi-app-demo-1' :'/app1', 8089),
        app2: getRemoteUrl('app2', isMulti ? 'http://mf-multi-app-demo-2' :'/app1', 8090)
      },
      shared: {
        vue: {
          singleton: true,
          eager: true
        }
      }
    }),
  ],
  

};
