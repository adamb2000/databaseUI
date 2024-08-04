const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    publicPath:"auto"
  },
  resolve: {
    extensions: ['.ts','.tsx','.js','.jsx','.css','.html','...']
  },
  mode: 'development',
    entry: {
     index: './src/index.js',
   },
  devServer: {
    port: 8080,  
    historyApiFallback: true, 
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: ':)',
      template: "./public/index.html"
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              
              localsConvention: 'camelCase',
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
};