#! /usr/bin/env node
import ff from 'node-find-folder'
import glob from 'tiny-glob'
import sharp from 'sharp'

const buildFolderIndex = process.argv.indexOf('--build-folder')
let buildFolderName = 'build'

if (buildFolderIndex > -1) {
  buildFolderName = process.argv[buildFolderIndex + 1]
}

const getBuildFolder = () => {
  const buildFolder = new ff(buildFolderName)[0]
  return buildFolder
}

const generateWebp = (file) => {
  const fileWithWebExtension = file.substr(0, file.lastIndexOf('.')) + `.webp`
  sharp(file).webp().toFile(fileWithWebExtension)
}

try {
  const buildFolder = getBuildFolder()
  glob(buildFolder + '/**/*.{jpg,png}')
    .then((files) => {
      files.forEach((file) => {
        generateWebp(file)
      })
      console.log('Images converted to webp successfully!')
    })
    .catch((e) => {
      console.error(e)
    })
} catch (e) {
  console.error(e)
}
