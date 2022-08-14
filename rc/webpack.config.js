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
        '@boot': path.resolve(__dirname, 'server/boot/'),
        '@commands': path.resolve(__dirname, 'server/commands/'),
        '@db': path.resolve(__dirname, 'server/db/'),
        '@discord': path.resolve(__dirname, 'server/discord/'),
        '@events': path.resolve(__dirname, 'server/events/'),
        '@items': path.resolve(__dirname, 'server/items/'),
        '@jobs': path.resolve(__dirname, 'server/jobs/'),
        '@player': path.resolve(__dirname, 'server/player/'),
        '@utils': path.resolve(__dirname, 'server/utils/'),

        '@shared': path.resolve(__dirname, 'shared/'),
        '@types': path.resolve(__dirname, '../types/'),
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
        '@class': path.resolve(__dirname, 'client/class/'),
        '@events': path.resolve(__dirname, 'client/events/'),
        '@items': path.resolve(__dirname, 'client/items/'),
        '@player': path.resolve(__dirname, 'client/player/'),
        '@utils': path.resolve(__dirname, 'client/utils/'),

        '@shared': path.resolve(__dirname, 'shared/'),
        '@types': path.resolve(__dirname, '../types/'),
      },
    },
    output: {
      filename: 'client.min.js',
      path: path.resolve(buildPath, 'client'),
    },
  }
}

module.exports = [server, client]
