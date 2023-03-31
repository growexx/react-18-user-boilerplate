// Important modules this config uses
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { GenerateSW } = require('workbox-webpack-plugin');
const { merge } = require('webpack-merge');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = require('./webpack.base.babel.js')({
  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: [
    require.resolve('react-app-polyfill/ie11'),
    path.join(process.cwd(), 'app/app.js'),
  ],

  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    assetModuleFilename: 'assets/[name].[hash][ext]',
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
          format: {
            comments: false,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    },
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new CleanWebpackPlugin(),
    new Dotenv(),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(process.cwd(), 'public'),
          globOptions: {
            ignore: ['**/index.html'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new WebpackManifestPlugin(),
    new WebpackPwaManifest({
      name: 'React Boilerplate',
      short_name: 'React BP',
      description: 'My React Boilerplate-based project!',
      background_color: '#fafafa',
      theme_color: '#b1624d',
      icons: [
        {
          src: path.resolve('app/images/favicons/android-chrome-512x512.png'),
          sizes: [16, 32, 192, 512],
          purpose: 'maskable',
        },
        {
          src: path.resolve('app/images/favicons/apple-touch-icon.png'),
          sizes: [120, 152, 167, 180],
          ios: true,
          purpose: 'maskable',
        },
      ],
      filename: 'manifest.json',
      crossorigin: 'use-credentials',
      inject: true,
      fingerprints: true,
      ios: true,
      includeDirectory: true,
      publicPath: '/',
      start_url: '.',
      display: 'standalone',
    }),

    // new HashedModuleIdsPlugin({
    //   hashFunction: 'sha256',
    //   hashDigest: 'hex',
    //   hashDigestLength: 20,
    // }),

    new Dotenv({
      path: './.env.production',
    }),
    // new ForkTsCheckerWebpackPlugin({
    //   async: false,
    //   typescript: {
    //     diagnosticOptions: {
    //       semantic: true,
    //       syntactic: true,
    //     },
    //   },
    // }),
  ],

  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
