const { defineConfig } = require('@vue/cli-service')

const { ModuleFederationPlugin } = require('webpack').container
const { dependencies } = require('./package.json')

module.exports = defineConfig({
  publicPath: 'auto',

  chainWebpack: (config) => {
    config.optimization.delete('splitChunks')
    config
      .plugin('module-federation-plugin')
      .use(ModuleFederationPlugin, [{
        name: 'library2',
        filename: 'remoteEntry.js',
        remotes: {
          library1: 'library1@http://localhost:8081/remoteEntry.js',
        },
        exposes: {
          './root': './src/index.js'
        },
        shared: dependencies,
      }])
  },

  devServer: {
    port: 8082,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
})
