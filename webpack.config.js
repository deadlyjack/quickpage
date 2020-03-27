const path = require("path");
module.exports = {
  mode: 'development',
  entry: {
    main: "./src/main.js"
  },
  output: {
    path: path.resolve(__dirname, "public/js/"),
    filename: "[name].min.js",
    chunkFilename: "[name].chunk.js",
    publicPath: '/js/'
  },
  module: {
    rules: [{
        test: /\.hbs$/,
        use: ['raw-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "css-loader?url=false",
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  }
};