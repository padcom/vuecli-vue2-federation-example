const { defineConfig } = require('@vue/cli-service')

const { ModuleFederationPlugin } = require('webpack').container
const { dependencies } = require('./package.json')

module.exports = defineConfig({
  // transpileDependencies: true,

  chainWebpack: (config) => {
    config
      .plugin('module-federation-plugin')
      .use(ModuleFederationPlugin, [{
        name: 'host',
        remotes: {
          'library1': 'library1@http://localhost:8081/remoteEntry.js',
          'library2': 'library2@http://localhost:8082/remoteEntry.js',
        },
        shared: dependencies,
      }])
  }
})
