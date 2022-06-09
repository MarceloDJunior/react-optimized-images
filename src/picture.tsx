import React, {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'

import { breakpoints, enabled } from 'react-optimized-images/config'

import styles from './picture.module.css'

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
  return fileName.substring(0, fileName.lastIndexOf('.'))
}

const getImageType = (fileName: string): string => {
  if (
    fileName.toLowerCase().endsWith('jpg') ||
    fileName.toLowerCase().endsWith('jpeg')
  ) {
    return 'image/jpeg'
  }
  return `image/${fileName
    .substring(fileName.lastIndexOf('.') + 1)
    .toLowerCase()}`
}

const getImageExtension = (fileName: string): string => {
  return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()
}

export const Picture = ({ src, className, ...props }: Props) => {
  const [hasError, setHasError] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const pictureRef = useRef<HTMLImageElement>(null)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
    }
  }

  const handleLoad = () => {
    if (!hasLoaded) {
      setTimeout(() => {
        setHasLoaded(true)
        if (pictureRef.current) {
          pictureRef.current.style.maxHeight = '100%'
        }
      }, 100)
    }
  }

  const imageWithoutExtension = getImageWithoutExtension(src)
  const extension = getImageExtension(src)

  const renderSources = () => {
    const webpImages = breakpoints.map(({ maxWidth, resizeTo }: Breakpoint) => (
      <source
        key={`${maxWidth}${resizeTo}webp`}
        srcSet={`${imageWithoutExtension}@${resizeTo / 100}x.webp`}
        media={`(max-width: ${maxWidth}px)`}
        type="image/webp"
      />
    ))
    webpImages.push(
      <source
        key={`${imageWithoutExtension}webp`}
        srcSet={`${imageWithoutExtension}.webp`}
        type="image/webp"
      />
    )
    const regularImages = breakpoints.map(
      ({ maxWidth, resizeTo }: Breakpoint) => (
        <source
          key={`${maxWidth}${resizeTo}${extension}`}
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

  useEffect(() => {
    if (pictureRef.current?.complete) {
      handleLoad()
    }
  }, [])

  if (enabled) {
    return (
      <div className={styles.container}>
        <img
          src={`${imageWithoutExtension}@preview.jpg`}
          className={`${className} ${styles.preview} ${
            hasLoaded ? styles.hidden : ''
          }`}
          {...props}
          style={{
            width: props.width || '100%',
            height: props.height || 'auto',
          }}
        />
        <picture
          className={className}
          style={{
            visibility: hasLoaded ? 'visible' : 'hidden',
            height: hasLoaded ? undefined : '0',
          }}
        >
          {!hasError && renderSources()}
          <source srcSet={src} type={`image/${extension}`} />
          <img
            ref={pictureRef}
            src={src}
            className={className}
            {...props}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              ...props.style,
              maxHeight: '0 !important',
            }}
          />
        </picture>
      </div>
    )
  }
  return <img src={src} className={className} {...props} />
}

export default Picture
