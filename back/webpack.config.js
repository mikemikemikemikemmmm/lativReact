var path = require('path')
const nodeExternals = require('webpack-node-externals')
module.exports = {
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        "@": path.resolve(__dirname, 'src'),
      }
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    externals: [nodeExternals()]
  };