// eslint-disable-next-line
const vueConfig = require('@daojia/vue3-cli-preset-config/vueConfig')

module.exports = vueConfig({
  lintOnSave: false,
  devServer: {
    allowedHosts: 'all',
    proxy: {
      '/': {
        target: 'https://jzedu-betaa.djtest.cn/'
      }
    }
  }
})
  .injectHtmlWebpackPlugin({
    useDefault: true
  }).getConfig()
