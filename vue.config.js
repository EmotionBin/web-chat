// const CompressionPlugin = require('compression-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

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
        // plugins: [
        //   // 打包后生成.gz压缩文件
        //   new CompressionPlugin({
        //     test: /\.js$|\.html$|\.css/,
        //     threshold: 10240,
        //     deleteOriginalAssets: false
        //   })
        // ],
        // optimization: {
        //   minimize: true,
        //   minimizer: [
        //     new TerserPlugin({
        //       test: /\.js$/,
        //       exclude: /node_modules/,
        //       terserOptions: {
        //         compress: {
        //           // 去除sonsole
        //           drop_console: true
        //         }
        //       }
        //     }),
        //   ]
        // }
      }
    } else {
      return {
        devtool: 'source-map'
      }
    }
  },
  devServer: {
    // 配置多个代理
    proxy: {
      '/api': {
        target: 'http://localhost:3808', // 这里写的是访问接口的域名和端口号
        changeOrigin: true, // 跨域请求
        pathRewrite: { // 重命名
          '^/api': ''
        }
      },
      '/socket.io': {
        target: 'http://localhost:3808', // 这里写的是访问接口的域名和端口号
        changeOrigin: true, // 跨域请求
        ws: true
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
  pages: {
    // 多页面模式配置，可配置多个页面应用
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  }
  // 取消代码eslint语法检测
  // lintOnSave: false
}