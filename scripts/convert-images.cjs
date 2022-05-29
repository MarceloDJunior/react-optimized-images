#! /usr/bin/env node
const ff = require('node-find-folder')
const glob = require('tiny-glob')
const sharp = require('sharp')

const config = require('../config.json')
const { breakpoints, minWidth } = config

let buildFolderName = 'build'

init()

async function init() {
  try {
    await populateOptions()
    const buildFolder = getBuildFolder()
    const files = await glob(buildFolder + '/**/*.{jpg,png}')
    files.forEach(async (file) => {
      await generateImages(file)
    })
    console.info('Images optimized successfully!')
  } catch (e) {
    console.error(e)
  }
}

async function populateOptions() {
  try {
    const buildFolderIndex = process.argv.indexOf('--build-folder')
    if (buildFolderIndex > -1) {
      buildFolderName = process.argv[buildFolderIndex + 1]
    }
  } catch (e) {}
}

function getBuildFolder() {
  const buildFolder = new ff(buildFolderName)[0]
  return buildFolder
}

async function generateImages(file) {
  const image = sharp(file)
  const { width, height } = await image.metadata()
  generateRegularImages(file, width, height)
  generateWebpImages(file, width, height)
}

function generateRegularImages(file, width, height) {
  const fileWithoutExtension = file.substr(0, file.lastIndexOf('.'))
  const fileExtension = file.substr(file.lastIndexOf('.') + 1)
  breakpoints.forEach(({ resizeTo }) => {
    const percentOfImage = resizeTo / 100
    const targetWidth = width * percentOfImage
    const targetHeight = height * percentOfImage
    const img = sharp(file).resize(
      Math.floor(targetWidth >= minWidth ? targetWidth : width),
      Math.floor(targetWidth >= minWidth ? targetHeight : height)
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
  breakpoints.forEach(({ resizeTo }) => {
    const percentOfImage = resizeTo / 100
    const targetWidth = width * percentOfImage
    const targetHeight = height * percentOfImage
    const img = sharp(file)
      .resize(
        Math.floor(targetWidth >= minWidth ? targetWidth : width),
        Math.floor(targetWidth >= minWidth ? targetHeight : height)
      )
      .webp({ quality: 80 })
    img.toFile(`${fileWithoutExtension}@${percentOfImage}x.webp`)
  })
}

const isPng = (fileName) => fileName.toLowerCase().endsWith('png')
