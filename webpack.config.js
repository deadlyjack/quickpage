const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {
  const { mode } = options;
  const IS_DEVELOPMENT = mode === 'development';

  if (!IS_DEVELOPMENT) {
    clearOutputDir('./public/js/');
    clearOutputDir('./public/css/');
    clearOutputDir('./public/res/');
  }

  const rules = [
    {
      test: /\.(hbs)$/,
      use: ['raw-loader'],
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../',
          hmr: IS_DEVELOPMENT,
        },
      },
      'css-loader',
      'postcss-loader',
      'sass-loader',
      ],
    },
    {
      test: /\.(png|svg|jpg|jpeg|ico|ttf|webp)$/,
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
  ];

  if (!IS_DEVELOPMENT) {
    rules.push({
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    });
  }

  return {
    stats: 'minimal',
    watchOptions: {
      ignored: [
        '**/node_modules',
        '**/server',
        '**/public',
        '**/tools',
      ],
    },
    mode,
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
      rules,
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
};

function clearOutputDir(dir) {
  fs.rmdir(path.resolve(__dirname, dir), {
    recursive: true,
  }, (err) => {
    if (err) throw (err instanceof Error ? err : new Error(err));
  });
}
