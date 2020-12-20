const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const cdnDependencies = require('./src/data/cdn')
const { chain, set, each } = require('lodash')

// 设置不参与构建的库
const externals = {}
cdnDependencies.forEach(pkg => { externals[pkg.name] = pkg.library })

// 引入文件的 cdn 链接
const cdn = {
  css: cdnDependencies.map(e => e.css).filter(e => e),
  js: cdnDependencies.map(e => e.js).filter(e => e)
}

const pages = undefined

module.exports = {
  // 打包后的路径
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // 是否使用包含运行时编译器的Vue内核版本
  runtimeCompiler: true,
  productionSourceMap: process.env.NODE_ENV !== 'production',
  configureWebpack: config => {
    // 如果是生产环境下，则打包采用Gzip压缩的方式，删除console，优化性能，减小体积
    if (process.env.NODE_ENV === 'production') {
      return {
        externals,
        plugins: [
          // 打包后生成.gz压缩文件
          new CompressionPlugin({
            test: /\.js$|\.css$/,
            threshold: 10240,
            deleteOriginalAssets: false
          })
        ],
        optimization: {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              test: /\.js$/,
              exclude: /node_modules/,
              terserOptions: {
                compress: {
                  // 去除sonsole
                  drop_console: true
                }
              }
            })
          ]
        }
      }
    } else {
      return {
        devtool: 'source-map'
      }
    }
  },
  chainWebpack: config => {
    /**
     * 添加 CDN 参数到 htmlWebpackPlugin 配置中
     */
    const htmlPluginNames = chain(pages).keys().map(page => 'html-' + page).value()
    const targetHtmlPluginNames = htmlPluginNames.length ? htmlPluginNames : ['html']
    each(targetHtmlPluginNames, name => {
      config.plugin(name).tap(options => {
        set(options, '[0].cdn', process.env.NODE_ENV === 'production' ? cdn : [])
        return options
      })
    })
  },
  devServer: {
    https: true,
    // 配置多个代理
    proxy: {
      '/api': {
        target: 'https://localhost:3808', // 这里写的是访问接口的域名和端口号
        changeOrigin: true, // 跨域请求
        pathRewrite: { // 重命名
          '^/api': ''
        }
      }
    }
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/common/variables.scss";
                      @import "@/styles/common/mixin.scss";`
      }
    }
  },
  pages

  // pages: {
  //   // 多页面模式配置，可配置多个页面应用
  //   index: {
  //     // page 的入口
  //     entry: 'src/main.js',
  //     // 模板来源
  //     template: 'public/index.html',
  //     // 在 dist/index.html 的输出
  //     filename: 'index.html',
  //     // 当使用 title 选项时，
  //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: 'web-chat',
  //     // 在这个页面中包含的块，默认情况下会包含
  //     // 提取出来的通用 chunk 和 vendor chunk。
  //     chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   }
  // }
  // 取消代码eslint语法检测
  // lintOnSave: false
}
