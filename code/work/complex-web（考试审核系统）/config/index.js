'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/comment/': {
        //target: 'http://www.el56.com/api',
        // target: 'http://web.com:10001/api',
        target: 'http://api01.idataapi.cn:8000/',
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      },
      '/complex/': {
        //target: 'http://139.159.158.32:3306/', // 测试环境yunjie
        target: 'http://139.159.149.124:28091/', // 测试环境
        //target: 'http://39.108.123.226:8080/',
        // target: 'http://10.39.141.88:8081/', //张恒
        // target: 'http://10.39.88.122:8081/', //狗子
        // target: 'http://10.39.141.84:8081/', //yunjie
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      }
    },
    cssSourceMap: false
  }
}
