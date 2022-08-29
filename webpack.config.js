const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = function (env, argv) {
  const resolvePlugins = [new TsconfigPathsPlugin()];
  const resolve = {
    plugins: resolvePlugins,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  };

  const output = (folder) => {
    return {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist', ...folder),
      clean: true,
    };
  };

  const mode = isDev ? 'development' : 'production';

  /** @type { import('webpack').Configuration} */
  const appConfig = {
    name: 'app',
    mode,
    entry: './src/app/index.tsx',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'swc-loader',
            },
          ],
        },
      ],
    },
    resolve,
    target: ['web', 'es2020'],
    output: output(['public']),
  };

  /** @type { import('webpack').Configuration} */
  const serverConfig = {
    name: 'server',
    mode,
    dependencies: ['app'],
    entry: './src/server',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'swc-loader',
            },
          ],
        },
      ],
    },
    resolve,
    target: 'node',
    output: output(['server']),
    externalsPresets: {
      node: true,
    },
    externals: [nodeExternals()],
  };
  return [appConfig, serverConfig];
};
