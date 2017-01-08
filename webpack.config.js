module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: './build'
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
