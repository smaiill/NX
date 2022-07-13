const webpack = require('webpack')
const path = require('path')
const buildPath = path.resolve(__dirname, '../dist')

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
      alias: {
        // server side paths.
        's@boot': path.resolve(__dirname, 'server/boot/'),
        's@db': path.resolve(__dirname, 'server/db/'),
        's@discord': path.resolve(__dirname, 'server/discord/'),
        's@events': path.resolve(__dirname, 'server/events/'),
        's@items': path.resolve(__dirname, 'server/items/'),
        's@jobs': path.resolve(__dirname, 'server/jobs/'),
        's@player': path.resolve(__dirname, 'server/player/'),
        's@utils': path.resolve(__dirname, 'server/utils/'),

        // shared paths.
        '@shared': path.resolve(__dirname, 'shared/'),
        '@types': path.resolve(__dirname, 'types/'),
      },
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
      alias: {
        // client paths.
        'c@class': path.resolve(__dirname, 'client/class/'),
        'c@events': path.resolve(__dirname, 'client/events/'),
        'c@items': path.resolve(__dirname, 'client/items/'),
        'c@player': path.resolve(__dirname, 'client/player/'),
        'c@utils': path.resolve(__dirname, 'client/utils/'),

        // shared paths.
        '@shared': path.resolve(__dirname, 'shared/'),
        '@types': path.resolve(__dirname, 'types/'),
      },
    },
    output: {
      filename: 'client.min.js',
      path: path.resolve(buildPath, 'client'),
    },
  }
}

module.exports = [server, client]
