const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'public/js/'),
    filename: '[name].min.js',
    chunkFilename: '[name].chunk.js',
    publicPath: './js/',
  },
  module: {
    rules: [{
      test: /\.(hbs)$/,
      use: ['raw-loader'],
    },
    {
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../',
          hmr: process.env.NODE_ENV === 'development',
        },
      },
      'css-loader',
      'postcss-loader',
      'sass-loader',
      ],
    },
    {
      test: /\.(png|svg|jpg|jpeg|ico)$/,
      loader: 'file-loader',
      options: {
        outputPath(url, res, ctx) {
          res = path.relative(ctx, res).replace(/^src/, '');
          return `../${res}`;
        },
        name: '[name].[ext]',
        publicPath(...args) {
          return this.outputPath(...args).replace('../', '');
        },
      },
    },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/[name].css',
      chunkFilename: '../css/[id].css',
    }),
  ],
  externals: [
    (function externals() {
      const IGNORES = [
        'electron',
      ];
      return function ignore(context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, `require('${request}')`);
        }
        return callback();
      };
    }()),
  ],
};
