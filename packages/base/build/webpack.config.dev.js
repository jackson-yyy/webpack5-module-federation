const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require('webpack').container;
const baseConfig = require("./webpack.config.base")

module.exports = merge(baseConfig, {
  mode: 'development',
  plugins: [
    new ModuleFederationPlugin({
      name: 'base',
      remotes: {
        app1: 'app1@http://localhost:8089/remoteEntry.js',
        app2: 'app2@http://localhost:8090/remoteEntry.js',
      },
    }),
  ]
})