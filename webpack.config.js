var Path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProduction = process.env.NODE_ENV === 'production';
var cssOutputPath = isProduction ? '/styles/app.[hash].css' : '/styles/app.css';
var jsOutputPath = isProduction ? '/scripts/app.[hash].js' : '/scripts/app.js';
var ExtractSASS = new ExtractTextPlugin(cssOutputPath);
var port = isProduction ? process.env.PORT || 8080 : process.env.PORT || 3001;

console.log('WEBPACK PORT', port)
// ------------------------------------------
// Base
// ------------------------------------------
var webpackConfig = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
      },
    }),
    new HtmlWebpackPlugin({
      template: Path.join(__dirname, './src/index.html'),
    }),
  ],
  module: {
    loaders: [{
      test: /.jsx?$/,
      include: Path.join(__dirname, './src/app'),
      loader: 'babel',
    }, {
        test: /.(svg|woff|woff2|png|ttf|eot)$/,
        loader: 'file-loader'
    }],
  },
};

// ------------------------------------------
// Entry points
// ------------------------------------------
webpackConfig.entry = !isProduction
  ? ['webpack-dev-server/client?http://localhost:' + port,
     'webpack/hot/dev-server',
     Path.join(__dirname, './src/app/index')]
  : [Path.join(__dirname, './src/app/index')];

// ------------------------------------------
// Bundle output
// ------------------------------------------
webpackConfig.output = {
  path: Path.join(__dirname, './dist'),
  filename: jsOutputPath,
};

// ------------------------------------------
// Devtool
// ------------------------------------------
webpackConfig.devtool = isProduction ? 'source-map' : 'cheap-eval-source-map';

// ------------------------------------------
// Module
// ------------------------------------------
isProduction
  ? webpackConfig.module.loaders.push({
      test: /\.scss$/,
      loader: ExtractSASS.extract(['css', 'sass']),
    },{
      test: /\.css$/,
      loader: ExtractSASS.extract(['css']),
    })
  : webpackConfig.module.loaders.push({
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
    },{
      test: /\.css$/,
      loaders: ['style', 'css'],
    });

// ------------------------------------------
// Plugins
// ------------------------------------------
isProduction
  ? webpackConfig.plugins.push(
      new Webpack.optimize.OccurenceOrderPlugin(),
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
      }),
      ExtractSASS
    )
  : webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin()
    );

// ------------------------------------------
// Development server
// ------------------------------------------
if (!isProduction) {
  webpackConfig.devServer = {
    contentBase: Path.join(__dirname, './'),
    hot: true,
    port: port,
    inline: true,
    progress: true,
    historyApiFallback: true,
  };
}

webpackConfig.devtool = 'source-map';

module.exports = webpackConfig;