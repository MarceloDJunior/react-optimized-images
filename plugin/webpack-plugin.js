const fs = require('fs')

const generateImages = require('./generate-images.js')

const NEW_CONFIG_OUTPUT = './node_modules/react-optimized-images/config.json'

const FONT_COLORS = {
  BLUE: '\x1b[36m%s\x1b[0m',
  DEFAULT: '\x1b[0m',
  GREEN: '\x1b[32m',
}

const defaultConfig = {
  minWidth: 200,
  breakpoints: [
    {
      maxWidth: 576,
      resizeTo: 50,
    },
    {
      maxWidth: 992,
      resizeTo: 70,
    },
  ],
}

class OptimizedImagesPlugin {
  options = {}

  constructor(options) {
    const customOptions = {
      minWidth: options?.minWidth || defaultConfig.minWidth,
      breakpoints: options?.breakpoints || defaultConfig.breakpoints,
    }
    this.options = customOptions
  }

  apply(compiler) {
    compiler.hooks.environment.tap('OptimizedImagesPlugin', () => {
      this.applyCustomConfig()
    })

    compiler.hooks.assetEmitted.tap(
      'OptimizedImagesPlugin',
      (_, { targetPath }) => {
        const extension = this.getExtension(targetPath)
        if (['jpg', 'jpeg', 'png'].includes(extension)) {
          generateImages(targetPath, this.options).then(() => {
            const fileName = targetPath.substring(
              targetPath.lastIndexOf('/') + 1
            )
            console.log(
              FONT_COLORS.BLUE,
              'info',
              `${FONT_COLORS.DEFAULT} - ${fileName} ${FONT_COLORS.GREEN}optimized ✔`
            )
          })
        }
      }
    )
  }

  applyCustomConfig() {
    const { minWidth, breakpoints } = this.options
    const newJsonConfig = JSON.stringify(
      {
        minWidth,
        breakpoints,
      },
      null,
      2
    )
    fs.writeFileSync(NEW_CONFIG_OUTPUT, newJsonConfig)
  }

  getExtension(filePath) {
    return filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase()
  }
}

module.exports = OptimizedImagesPlugin
