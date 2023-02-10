const { defineConfig } = require("@vue/cli-service");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = defineConfig({
  devServer: {
    port: 8081,
  },
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "app2",
        filename: "entry.js",
        exposes: {
          './exports': './src/exports.ts'
        },
      }),
    ],
  },
});
