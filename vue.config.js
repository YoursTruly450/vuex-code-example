module.exports = {
  chainWebpack: config => {
    config.module
        .rule('vue')
        .use('vue-loader')
        .tap(args => {
          args.compilerOptions.whitespace = 'preserve'
        })
  },
  runtimeCompiler: true,
  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: 'ru',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  devServer: {
    proxy: ""
  }
}
