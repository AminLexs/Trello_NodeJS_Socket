const path = require('path');
module.exports = {
   entry: 'index.js',
   output: {
      path: path.join(__dirname, './public/javascript'),
      filename: 'bundle.js'
   },
   devServer: {
      port: 8082,
      open: true,
      query: {
        presets: ['es2015', 'react']
     }
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            use: "babel-loader",
            exclude: [/node_modules/, /public/]
         },
         {
            test: /\.css$/,
            use:[
               {loader:'style-loader'},
               {loader:'css-loader'}
            ],
            exclude: [/node_modules/, /public/]
         },
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options:{
               presets:["@babel/preset-env", "@babel/preset-react"]  
            }  // используемые плагины
         }
      ]
   }
}