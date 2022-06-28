const webpack = require('webpack')
const path = require('path')
const buildPath = path.resolve(__dirname, 'dist')

const server = () => {
  return {
    entry: './server/index.ts',
    target: 'node',
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: ['ts-loader'],
          exclude: /node_modules/,
        },
      ],
    },
    optimization: {
      minimize: true,
    },
    resolve: {
      extensions: ['.ts', '.js', '.cjs'],
    },
    output: {
      filename: 'server.min.js',
      path: path.resolve(buildPath, 'server'),
    },
  }
}

const client = () => {
  return {
    entry: './client/index.ts',
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: ['ts-loader'],
          exclude: /node_modules/,
        },
      ],
    },
    optimization: {
      minimize: true,
    },
    resolve: {
      extensions: ['.ts', '.js', '.cjs'],
    },
    output: {
      filename: 'client.min.js',
      path: path.resolve(buildPath, 'client'),
    },
  }
}

module.exports = [server, client]
