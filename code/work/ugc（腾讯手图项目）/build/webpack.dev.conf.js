'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks: ['app'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'myfeedback.html',
      template: 'index.html',
      chunks: ['myfeedback'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'reporter.html',
      template: 'index.html',
      chunks: ['reporter'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'accident.html',
      template: 'index.html',
      chunks: ['accident'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'congestion.html',
      template: 'index.html',
      chunks: ['congestion'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'construction.html',
      template: 'index.html',
      chunks: ['construction'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'roadClosed.html',
      template: 'index.html',
      chunks: ['roadClosed'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'trafficControl.html',
      template: 'index.html',
      chunks: ['trafficControl'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'reporterAddPoi.html',
      template: 'index.html',
      chunks: ['reporterAddPoi'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'reporterErrorPoi.html',
      template: 'index.html',
      chunks: ['reporterErrorPoi'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'reporterAddFeedback.html',
      template: 'index.html',
      chunks: ['reporterAddFeedback'],
      inject: true
    })
    // copy custom static assets
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../static'),
    //     to: config.dev.assetsSubDirectory,
    //     ignore: ['.*']
    //   }
    // ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
