const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");



module.exports = {
    mode: process.env.NODE_ENV, 
    entry: {
        index: './client/index.js',
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'build'),
        publicPath:'/',
        clean: true,
        // assetModuleFilename:'[name][ext]' << can't remember what this does 
    },
    devtool: 'source-map',
    devServer : {
        static: {
            directory: path.resolve(__dirname,'build'),
            publicPath: '/build/',
        },
        historyApiFallback: true,
        port: 3000, //will open up dev on localhost 3000
        open: true,
        hot: true,
        compress: true,

    },
    //allows us to go over the default size of bundled package (lots of data/npm packages)
    performance : {
        hints: false,
    },
    plugins: [new HtmlWebpackPlugin({
        title: "Group Project",
        template: './client/index.html'
    })],
    //loaders go here
    module : {
        rules : [
            {
                // test: /\.jsx?/,
                test: /\.(js|jsx)$/,
                exclude : /node_modules/,
                use : {
                    loader: 'babel-loader',
                    options:{
                        presets: ['@babel/preset-env', '@babel/preset-react', ]
                    }
                }  
            },
            {
                test: /\.s[ac]ss$/i,
                // below works for basic CSS 
                // test: /\.css$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
            },
            {
                // able to add images w this (might need to edit a bit)
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
        ]
    },
    resolve: {
        extensions: [".*",".js",".jsx"]  
    }
}