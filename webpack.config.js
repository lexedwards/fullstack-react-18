const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = function (env, argv) {
  /** @type {import('webpack').Configuration['mode']} */
  const mode = env.production ? 'production' : 'development';
  const isDev = mode !== 'production';

  /** @type { import('webpack').RuleSetRule } */
  const typescriptLoader = {
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'swc-loader',
    },
  };

  const resolvePlugins = [new TsconfigPathsPlugin()];
  const resolve = {
    plugins: resolvePlugins,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  };

  const output = (folder) => {
    return {
      filename: isDev ? '[name].js' : '[name].[hash].js',
      path: path.resolve(__dirname, 'dist', ...folder),
      clean: true,
    };
  };

  /** @type { import('webpack').Configuration} */
  const appConfig = {
    name: 'app',
    mode,
    entry: './src/app/index.tsx',
    module: {
      rules: [typescriptLoader],
    },
    resolve,
    target: ['web', 'es2020'],
    output: output(['app']),
  };

  /** @type { import('webpack').Configuration} */
  const serverConfig = {
    name: 'server',
    mode,
    dependencies: ['app'],
    entry: './src/server',
    module: {
      rules: [typescriptLoader],
    },
    resolve,
    target: 'node',
    output: output(['server']),
  };
  return [appConfig, serverConfig];
};
