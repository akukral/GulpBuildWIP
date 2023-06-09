module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: '/public_html/ui/_js/main.js',
  output: {
    filename: 'main.js',
    path: __dirname + '/public_html/ui/js/',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
  watchOptions: {
    ignored: ['**/node_modules'],
    aggregateTimeout: 200,
    poll: 1000,
  },
};
