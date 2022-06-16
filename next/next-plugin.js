const OptimizedImagesPlugin = require(`${__dirname}/../plugin/webpack-plugin.js`);

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { minWidth, breakpoints, enabled, lazy } = nextConfig;
      config.plugins.push(
        new OptimizedImagesPlugin({ minWidth, breakpoints, enabled, lazy })
      );

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};
