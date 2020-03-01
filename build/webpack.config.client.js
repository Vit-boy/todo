const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin()
]

const devServer = {
  port: 8000,
  host: '0.0.0.0', // 设置ip便于手机访问或其他电脑访问这个地址
  overlay: { // webpack编译出错则显示到网页上
    errors: true, // 让报错信息可以在网页内看到，便于快速定位错误
  },
  historyApiFallback: { // 用来做路径映射，如果不写页面就找不到了
    index: '/public/index.html'
  },
  hot: true // 热加载
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
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
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
        filename: `styles.[md5:contenthash:hex:8].css`
      }),
      // new ExtractPlugin({
      //   filename: `[name]_[md5:contenthash:hex:8].css`
      // }),
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
