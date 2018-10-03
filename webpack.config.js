const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
console.log(WEBPACK_ENV)

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: WEBPACK_ENV === 'dev' ? '/dist/' : '//s.youmall.co/youmall-admin-react/dist',
    filename: 'js/app.js'
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, 'src/pages'),
      components: path.resolve(__dirname, 'src/components'),
      util: path.resolve(__dirname, 'src/util'),
      service: path.resolve(__dirname, 'src/service'),
    }
  },
  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [
              "babel-plugin-transform-class-properties"
            ]
          }
        }
      },
      // css
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      // sass
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      //picture
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      },
      // font
      {
        test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // html
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './favicon.ico'
    }),
    // css
    new ExtractTextPlugin('css/[name].css'),
    // Common Chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    })
  ],
  devServer: {
    port: 8086,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy: {
      '/manage': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      },
      '/user/logout.do': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      }
    }
  }
}