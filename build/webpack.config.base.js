const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    mode: process.env.NODE_ENV || 'production',
    target: 'web', // 目标网页
    entry: path.join(__dirname, '../client/client-entry.js'), // 把当前文件的所在目录也就是根目录和 后面的‘../client/index.js’用join拼接起来
    output: {
      filename: 'bundle.[hash:8].js',
      path: path.join(__dirname, '../dist'), // 输出路径
      publicPath: 'http://127.0.0.1:8000/public/'
    },
    module: { // 配置加载资源
      rules: [ // 规则
        {
          test: /\.(vue|js|jsx)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          enforce: 'pre'
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: createVueLoaderOptions(isDev)
        },
        {
          resourceQuery: /blockType=docs/,
          loader: require.resolve('./doc-loader.js')
        },
        {
          test: /\.jsx$/,
          loader: 'babel-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(gif|jpg|jpeg|png|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                esModule: false,
                limit: 1024, // 文件小于1024字节，转换成base64编码。写入文件里
                name: 'resources/[path][name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
}


module.exports = config
