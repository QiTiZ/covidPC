module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://news.sina.com.cn/',
        pathRewrite: {
          '^/api': ''
        }
      },
      '/riskArea': {
        target: 'https://interface.sina.cn/',
        pathRewrite: {
          '^/riskArea': ''
        }
      }
    }
  },

  chainWebpack: config => {
    config.externals({
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
      echarts: 'echarts'
    })
  }
}
