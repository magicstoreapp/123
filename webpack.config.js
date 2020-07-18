const currentTask = process.env.npm_lifecycle_event;

const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');
const HtmlWebpackPlugin =require('html-webpack-plugin');
const fse=require("fs-extra");


const postCSSPlugins=[
  require("postcss-import"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("autoprefixer")
];

class RunAfterCompile{
  apply(compiler){
    compiler.hooks.done.tap("Copyimages",function(){
      fse.copySync("./src/img","./docs/images");
    });
  }
};

let cssConfig={
  test: /\.css$/i,
  use: 
      [
        //"style-loader", 
        "css-loader",
        {loader:"postcss-loader",options:{plugins:postCSSPlugins}}
      ]
};
let pages = fse
    .readdirSync("./src")
    .filter(function(file){
      return file.endsWith(".html");
    })
    .map(function(page){
      return new HtmlWebpackPlugin({
        filename:page,
        template: `./src/${page}`
      });
    });

let config={
  entry: path.resolve(__dirname, "./src/index.js"),
  plugins:pages,
  module:{
    rules: [
        {
          test: /\.js$/,
          use: "babel-loader"
        }, 
        cssConfig
    ]
  }
}

if(currentTask=="dev"){
  cssConfig.use.unshift('style-loader');
  config.output= {
    path: path.resolve(__dirname, 'src'),
    filename: 'bundle.js'
  },
  config.devServer={
    before:function(app,server){
        server._watch("./app/**/*.html");
    },
    contentBase: path.resolve(__dirname,"./src"),
    historyApiFallback:true,
    hot:true,
    port:3000,
    host:'0.0.0.0'
  },
  config.mode="development"
}

if(currentTask=="build"){
  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    use:{
      loader:"babel-loader",
      options:{
        presets:["@babel/preset-env"]
      }
    }
  });

  cssConfig.use.unshift(MiniCssExtractPlugin.loader);
  postCSSPlugins.push(require("cssnano"));
  config.output= {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  config.mode="production",
  config.optimization={
    splitChunks:{chunks:"all"}
  },
  config.plugins.push(
    new CleanWebpackPlugin(), 
    new MiniCssExtractPlugin({filename:"styles.[chunkhash].css"}),
    new RunAfterCompile()
    )

}





module.exports = config;