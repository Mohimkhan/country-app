const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/js/app.js'),
        country: path.resolve(__dirname, './src/js/country.js'),
        DarkAndLightMode: path.resolve(__dirname, './src/js/DarkAndLightMode.js'),
        lazyLoad: path.resolve(__dirname, './src/js/lazyLoad.js'),
        preloader: path.resolve(__dirname, './src/js/preloader.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name][contenthash].js',
        clean: true
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src/css'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                },
            }
        ],
    },
    plugins:[
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            excludeChunks: ['country'],
        }),
        new htmlWebpackPlugin({
            filename: 'pages/country.html', // Output country.html in 'dist/pages'
            template: './src/pages/country.html',
            chunks: ['country', 'DarkAndLightMode', 'lazyLoad'], // Include specific chunks
        }),
    ] 
}