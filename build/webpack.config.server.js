const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ExtractPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config

config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: '#source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: ExtractPlugin.extract({
              fallback: 'vue-style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: '[path]-[name]-[hash:base64:5]',
                    camelCase: true
                  }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                      sourceMap: true,
                    }
                },
                'stylus-loader'
              ]
            })
          },
          {
            use: ExtractPlugin.extract({
              fallback: 'vue-style-loader',
              use: [
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true,
                  }
                },
                'stylus-loader'
              ]
            })
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractPlugin({
      filename: `[name]_[md5:contenthash:hex:8].css`
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin()
  ]
})

module.exports = config
