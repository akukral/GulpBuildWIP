module.exports = {
  output: {
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['env',
              {
                targets: {
                  browsers: [
                    'last 3 versions',
                    'IE >= 10',
                  ],
                },
                useBuiltIns: true,
              },
            ],
          ],
        },
      },
    ],
  },
};
