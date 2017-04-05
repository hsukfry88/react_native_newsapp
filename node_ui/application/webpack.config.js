var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin =require('html-webpack-plugin');
var ExtractTextPlugin =require('extract-text-webpack-plugin');
var config =require('./config');

module.exports = {
  entry: [
    'babel-polyfill',
    config.srcDir+'/main.js'
  ],
  output: {
    path: config.buildDir+'/assets',//打包文件存放的绝对路径
    //publicPath:！！！！开发环境网站运行时的访问路径
    filename: 'scripts/build.js'//打包后的文件名
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react'],
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    contentBase: './build',
    hot: true,
    inline: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'scripts/[name].[chunkhash:5].bundle.js'
    }),
    //把css从js中独立抽离出来
    new ExtractTextPlugin("stylesheets/[name].css"),
    //生成html文件,注入script
    new HtmlWebpackPlugin({
      template:config.srcDir+'/index.html',
      filename:config.buildDir+'/views/index.html',
      minify: {
          removeCommets: true,
          collapseWhitespace: true
      }
    })
  ])
}
