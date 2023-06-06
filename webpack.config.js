const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const pkg = require('./package.json');
const libraryName= pkg.name;
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',      
    publicPath: '/dist/',      
    umdNamedDefine: true
  },
  target: 'browserslist',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {      
        alias: {          
            'react': path.resolve(__dirname, './node_modules/react'),
          'react-dom': path.resolve(__dirname, './node_modules/react-dom'),      
        }  
    },  
    externals: {      
        react: {          
            commonjs: "react",          
            commonjs2: "react",          
            amd: "React",          
            root: "React"      
        },      
        "react-dom": {          
            commonjs: "react-dom",          
            commonjs2: "react-dom",          
            amd: "ReactDOM",          
            root: "ReactDOM"      
        }  
    } ,
  plugins: [
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  }
}
