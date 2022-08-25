const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "build" : "build",
  outputDir: 'build',
  indexPath: '../index.html',
  // devServer: {
  //   hot: false,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost/admin/',
  //       secure: false,
  //       changeOrigin: true
  //     }
  //   }
  // },
})
