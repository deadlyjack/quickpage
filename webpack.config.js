import { resolve, join } from 'path';
import { readdirSync, statSync, rmdirSync, unlinkSync } from 'fs';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const PUBLIC = resolve(process.cwd(), 'public');

export default (env, options) => {
  const { mode } = options;

  clearOutputDir();

  const rules = [
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
      }
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
  ];

  return {
    resolve: {
      modules: ["node_modules", "app"],
    },
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
      main: './app/main.js',
    },
    output: {
      path: PUBLIC,
      filename: '[name].min.js',
      chunkFilename: '[name].chunk.js',
      publicPath: '/',
      assetModuleFilename: '[name][ext]',
    },
    module: {
      rules,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
    externals: [
      externals(),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
  };
};

function externals() {
  const IGNORES = [
    'electron',
  ];
  return function ignore({ request }, callback) {
    if (IGNORES.indexOf(request) >= 0) {
      return callback(null, `require('${request}')`);
    }
    return callback();
  };
}

function clearOutputDir() {
  const files = readdirSync(PUBLIC);
  files.forEach((file) => {
    if (file !== 'index.html') {
      const entry = join(PUBLIC, file);
      if (statSync(entry).isDirectory()) {
        rmdirSync(entry, { recursive: true });
      } else {
        unlinkSync(entry);
      }
    }
  });
}
