import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

type Props = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  src: string
}

const replaceExtension = (fileName: string, targetExtension: string) => {
  return fileName.substr(0, fileName.lastIndexOf('.')) + `.${targetExtension}`
}

const getImageExtension = (fileName: string): string => {
  if (
    fileName.toLowerCase().endsWith('jpg') ||
    fileName.toLowerCase().endsWith('jpeg')
  ) {
    return 'jpeg'
  }
  return fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase()
}

export const Picture = ({ src, ...props }: Props) => {
  const webpSrc = replaceExtension(src, 'webp')

  return (
    <picture>
      <source srcSet={webpSrc || src} type="image/webp" />
      <source srcSet={src} type={`image/${getImageExtension(src)}`} />
      <img src={src} {...props} />
    </picture>
  )
}

export default Picture
