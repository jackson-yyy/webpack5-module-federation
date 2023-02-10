const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = defineConfig({
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'base',
        remotes: {
          app2: 'app2@http://10.32.138.152:8081/entry.js'
        }
      })
    ]
  }
})