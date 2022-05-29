import React, { DetailedHTMLProps, ImgHTMLAttributes, useState } from 'react'

import { breakpoints } from '../config.json'

type Props = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  src: string
}

type Breakpoint = {
  maxWidth: number
  resizeTo: number
}

const getImageWithoutExtension = (fileName: string): string => {
  return fileName.substr(0, fileName.lastIndexOf('.'))
}

const getImageType = (fileName: string): string => {
  if (
    fileName.toLowerCase().endsWith('jpg') ||
    fileName.toLowerCase().endsWith('jpeg')
  ) {
    return 'image/jpeg'
  }
  return `image/${fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase()}`
}

const getImageExtension = (fileName: string): string => {
  return fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase()
}

export const Picture = ({ src, ...props }: Props) => {
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
    }
  }

  const imageWithoutExtension = getImageWithoutExtension(src)
  const extension = getImageExtension(src)

  const renderSources = () => {
    const webpImages = breakpoints.map(({ maxWidth, resizeTo }: Breakpoint) => (
      <source
        key={`${maxWidth}${resizeTo}`}
        srcSet={`${imageWithoutExtension}@${resizeTo / 100}x.webp`}
        media={`(max-width: ${maxWidth}px)`}
        type="image/webp"
      />
    ))
    webpImages.push(
      <source srcSet={`${imageWithoutExtension}.webp`} type="image/webp" />
    )
    const regularImages = breakpoints.map(
      ({ maxWidth, resizeTo }: Breakpoint) => (
        <source
          key={`${maxWidth}${resizeTo}`}
          srcSet={`${imageWithoutExtension}@${resizeTo / 100}x.${extension}`}
          media={`(max-width: ${maxWidth}px)`}
          type={getImageType(src)}
        />
      )
    )
    return (
      <>
        {webpImages}
        {regularImages}
      </>
    )
  }

  return (
    <picture>
      {!hasError && renderSources()}
      <source srcSet={src} type={`image/${extension}`} />
      <img src={src} {...props} onError={handleError} />
    </picture>
  )
}

export default Picture
