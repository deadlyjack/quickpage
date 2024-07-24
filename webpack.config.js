import { resolve } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const PUBLIC = resolve(process.cwd(), 'dist/app');
const SERVER = resolve(process.cwd(), 'dist/server');

export default (env, options) => {
  const { mode } = options;

  const config = {
    resolve: {
      modules: ['node_modules', 'app'],
    },
    stats: 'minimal',
    watchOptions: {
      ignored: [
        '**/node_modules',
        '**/dist',
        '**/tools',
      ],
    },
    mode,
    entry: {
      main: './app/main.js',
    },
    output: {
      path: PUBLIC,
      filename: '[name].min.js',
      chunkFilename: '[name].chunk.js',
      publicPath: '/',
      assetModuleFilename: '[name][ext]',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.module.(sa|sc|c)ss$/,
          use: [
            'raw-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.jsx?$/,
          type: 'javascript/auto',
          exclude: /(node_modules)/,
          use: [
            'html-tag-js/jsx/tag-loader.js',
            'babel-loader',
          ],
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /(?<!\.module)\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|ico|ttf|webp|eot|woff)(\?.*)?$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
  };

  return [
    {
      ...config,
      plugins: [
        ...config.plugins,
        new HtmlWebpackPlugin({
          template: './app/index.html',
          filename: 'index.html',
          inject: 'head',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
          },
        }),
      ],
    },
    {
      ...config,
      target: 'node',
      entry: {
        main: './server/main.js',
      },
      resolve: {
        modules: ['node_modules', 'server'],
      },
      context: process.cwd(),
      output: {
        path: SERVER,
        filename: '[name].cjs',
        assetModuleFilename: '[name][ext]',
        publicPath: '/',
        clean: true,
      },
      externals: {
        express: 'commonjs express',
      },
    },
  ];
};
