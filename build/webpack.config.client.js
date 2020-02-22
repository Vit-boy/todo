const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: isDev ? '"development"' : '"production"'
      }
  }),
  new HTMLPlugin()
]

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
      errors: true,
  },
  hot: true
}

let config

if (isDev) {
    config = merge(baseConfig, {
      devtool: '#cheap-module-eval-source-map',
      module: {
        rules: [
          {
            test: /\.styl/,
            oneOf: [
              {
                resourceQuery: /module/,
                use: [
                  'vue-style-loader',
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
              },
              {
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    'stylus-loader'
                ]
              }
            ]
          }
        ]
      },
      devServer,
      plugins: defaultPlugins.concat([
        new webpack.HotModuleReplacementPlugin()
        // new webpack.NoEmitOnErrorsPlugin()
      ])
    })
} else {
    config = merge(baseConfig, {
      entry: {
        app: path.join(__dirname, '../client/index.js'),
        // vendor: ['vue']
      },
      output: {
        filename: '[name].[chunkhash:8].js'
      },
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
      optimization: {
        splitChunks: {
          chunks: 'all'
        },
        runtimeChunk: true
      },
      plugins: defaultPlugins.concat([
        new ExtractPlugin({
          filename: `[name]_[md5:contenthash:hex:8].css`
        })
        // new ExtractPlugin('styles.[contentHash:8].css')
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'runtime'
        // })
      ])
    })
}

module.exports = config
