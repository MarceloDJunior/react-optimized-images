const sharp = require('sharp')

let options = {}

async function generateImages(file, customOptions) {
  options = customOptions
  const image = sharp(file)
  const { width, height } = await image.metadata()
  generateRegularImages(file, width, height)
  generateWebpImages(file, width, height)
}

function generateRegularImages(file, width, height) {
  const fileWithoutExtension = file.substr(0, file.lastIndexOf('.'))
  const fileExtension = file.substr(file.lastIndexOf('.') + 1)
  options.breakpoints.forEach(({ resizeTo }) => {
    const percentOfImage = resizeTo / 100
    const targetWidth = width * percentOfImage
    const targetHeight = height * percentOfImage
    const img = sharp(file).resize(
      Math.floor(targetWidth >= options.minWidth ? targetWidth : width),
      Math.floor(targetWidth >= options.minWidth ? targetHeight : height)
    )
    if (isPng(file)) {
      img.png({ quality: 80, palette: true })
    } else {
      img.jpeg({ quality: 80 })
    }
    img.toFile(`${fileWithoutExtension}@${percentOfImage}x.${fileExtension}`)
  })
}

function generateWebpImages(file, width, height) {
  const fileWithoutExtension = file.substr(0, file.lastIndexOf('.'))
  sharp(file).webp().toFile(`${fileWithoutExtension}.webp`)
  options.breakpoints.forEach(({ resizeTo }) => {
    const percentOfImage = resizeTo / 100
    const targetWidth = width * percentOfImage
    const targetHeight = height * percentOfImage
    const img = sharp(file)
      .resize(
        Math.floor(targetWidth >= options.minWidth ? targetWidth : width),
        Math.floor(targetWidth >= options.minWidth ? targetHeight : height)
      )
      .webp({ quality: 80 })
    img.toFile(`${fileWithoutExtension}@${percentOfImage}x.webp`)
  })
}

const isPng = (fileName) => fileName.toLowerCase().endsWith('png')

module.exports = generateImages
