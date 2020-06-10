let { NODE_ENV } = process.env
let isPro = NODE_ENV === 'production'
let isDev = NODE_ENV === 'development'
const Prefix = '/manage/'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  // 代理
  devServer: {
    proxy: {
      [Prefix]: {
        target: process.env.VUE_APP_API_URL,
        ws: true,
        changeOrigin: true
      },
    }
  },
  // webpack
  configureWebpack: {
    // 生产环境下 去除运行依赖包
    // externals: isPro
    //   ? {
    //     // 前者是导入名, 后者是导出名
    //     // vue
    //     vue: 'Vue',
    //     // vueroter
    //     'vue-router': 'VueRouter',
    //     // axios
    //     axios: 'axios',
    //     // vuex
    //     vuex: 'Vuex'
    //   }
    //   : {}
    plugins: isPro ? [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true,
            // 移除console
            pure_funcs: ['console.log'],
          },
        },
      })
    ] : undefined
  },
  chainWebpack: config => {
    /* 添加分析工具*/
    // if (isPro) {
    //   if (process.env.npm_config_report) {
    //     config
    //       .plugin("webpack-bundle-analyzer")
    //       .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
    //       .end();
    //     config.plugins.delete("prefetch");
    //   }
    // }
  },
  // 生产环境去除 map 文件
  productionSourceMap: true,
  // 开发环境引入 public/dev.html
  // pages: isDev
  //   ? {
  //     index: {
  //       // page 的入口
  //       entry: 'src/dev.ts',
  //       // 模板来源
  //       template: 'public/dev.html'
  //     }
  //   }
  //   : undefined
}
