const { defineConfig } = require('@vue/cli-service')

const { ModuleFederationPlugin } = require('webpack').container
const { dependencies } = require('./package.json')

module.exports = defineConfig({
  // transpileDependencies: true,
  publicPath: 'auto',

  chainWebpack: (config) => {
    config.optimization.delete('splitChunks')
    config
      .plugin('module-federation-plugin')
      .use(ModuleFederationPlugin, [{
        name: 'library1',
        filename: 'remoteEntry.js',
        remotes: {
          'library2': 'library2@http://localhost:8082/remoteEntry.js',
        },
        exposes: {
          './root': './src/index.js'
        },
        shared: dependencies,
      }])
  },

  devServer: {
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
})
