/*
 * @Author: 周冰洁
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    // 自动解析一下拓展，当我们要引入src/index.ts的时候，只需要写src/index即可
    // 后面我们讲TS模块解析的时候，写src也可以
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    // 配置以.ts/.tsx结尾的文件都用ts-loader解析
    // 这里我们用到ts-loader，所以要安装一下
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  // 这里使用webpack-dev-server，进行本地开发调试
  devServer: {
    // contentBase: './dist', /* webpack5 弃用此属性, 使用static属性 */
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    client: {
      progress: true,
      overlay: {
        errors: true,
        warnings: false
      },
    },
    compress: false,
    host: 'localhost',
    port: 8089,
    proxy: {
      '/api': {
        target: 'https://apis.juhe.cn/',
        changeOrigin: true,
        // bypass: function (req, res, proxyOptions) {
        //   console.log('By pass', req, res, proxyOptions)
        // },
        // secure: false,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 这里我们指定编译需要用模板,打包时会根据此html文件生成页面入口文件
    new HtmlWebpackPlugin({
      template: './src/template/index.html'
    }),
  ],
};