const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, options) => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    },
    resolve: {
      alias: {
        react: path.resolve('./node_modules/react')
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /(node_modules|bower_components|dist)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env']
            }
          }
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[sha1:hash:hex:4]'
                },
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [require('autoprefixer')()]
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom'
    },
    plugins: [
      ...(options.mode !== 'production'
        ? [
            new BundleAnalyzerPlugin({
              analyzerPort: 8889
            })
          ]
        : [])
    ]
  };
};
