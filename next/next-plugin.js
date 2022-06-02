const OptimizedImagesPlugin = require('../plugin/webpack-plugin.js')

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { minWidth, breakpoints } = nextConfig
      config.plugins.push(new OptimizedImagesPlugin({ minWidth, breakpoints }))

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}
