const webpack = require('webpack')
const path = require('path')
const glob = require('glob-all')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const inProduction = (process.env.NODE_ENV === 'production')

module.exports = {
    entry: {
        main: [
            './js/main.js',
            <% if (processor === 'Sass') { %>'./scss/main.scss'<% } %><% if (processor === 'PostCSS') { %>'./css/main.css'<% } %>
        ],
        // vendor: [] // uncomment and add vendor packages to create vendor bundle
    },

    output: {
        path: path.resolve(__dirname, './build'),
        filename: inProduction ? '[name].[chunkhash].js' : '[name].js'
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: <% if (processor === 'Sass') { %>/\.s[ac]ss$/<% } %><% if (processor === 'PostCSS') { %>/\.css$/<% } %>,
                use: ExtractTextPlugin.extract({
                    use: <% if (processor === 'Sass') { %>['css-loader', 'postcss-loader', 'sass-loader']<% } %><% if (processor === 'PostCSS') { %>'css-loader?importLoaders=1,url=false!postcss-loader'<% } %>,
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            },

            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: inProduction ? 'img/[name].[hash].[ext]' : 'img/[name].[ext]'
                        }
                    },

                    'img-loader'
                ]
            },

            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: /node_modules/
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },

            // uncomment and add options to use modernizr
            // {
            //     loader: 'webpack-modernizr-loader',
            //     options: {},
            //     test: /modernizr\.js$/
            // }
        ]
    },

    // uncomment to use modernizr
    // resolve: {
    //     alias: {
    //         'modernizr': path.resolve(__dirname, 'modernizr.js')
    //     }
    // },

    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),

        new ExtractTextPlugin(inProduction ? '[name].[chunkhash].css' : '[name].css'),

        new PurifyCSSPlugin({
            paths: glob.sync([
                path.join(__dirname, '**/*.php'),
                path.join(__dirname, 'js/*.js')
            ]),
            minimize: inProduction
        }),

        new StyleLintPlugin({
            <% if (processor === 'Sass') { %>files: ['scss/*.scss']<% } else { %>files: ['css/*.css']<% } %>
        }),

        // uncomment this plugin if using vendor chunk
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'vendor.js'
        // }),

        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        }),

        new ManifestPlugin(),

        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: '<%= proxy %>',
            files: [
                path.join(__dirname, '**/*.php'),
                path.join(__dirname, 'build/*')
            ],
            open: false,
            notify: false
        })
    ]
}

if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
    )
}
