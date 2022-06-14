import React, {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { breakpoints, enabled } from 'react-optimized-images/config';
import { useIntersectionObserver } from '../../hooks/use-intersection-observer';

import styles from './picture.module.css';

type Props = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  src: string;
  lazy?: boolean;
};

type Breakpoint = {
  maxWidth: number;
  resizeTo: number;
};

const getImageWithoutExtension = (fileName: string): string => {
  return fileName.substring(0, fileName.lastIndexOf('.'));
};

const getImageType = (fileName: string): string => {
  if (
    fileName.toLowerCase().endsWith('jpg') ||
    fileName.toLowerCase().endsWith('jpeg')
  ) {
    return 'image/jpeg';
  }
  return `image/${fileName
    .substring(fileName.lastIndexOf('.') + 1)
    .toLowerCase()}`;
};

const getImageExtension = (fileName: string): string => {
  return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
};

export const Picture = ({ src, className, lazy, ...props }: Props) => {
  const [hasError, setHasError] = useState(false);
  const [hasLoadedPreview, setHasLoadedPreview] = useState(false);
  const [hasLoadedPicture, setHasLoadedPicture] = useState(lazy ? false : true);
  const [isIntersecting, setIsIntersecting] = useState(lazy ? false : true);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const pictureRef = useRef<HTMLImageElement>(null);

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
    }
  }, [hasError]);

  const handlePreviewLoad = useCallback(() => {
    if (!hasLoadedPreview) {
      setHasLoadedPreview(true);
    }
  }, [hasLoadedPreview]);

  const handlePictureLoad = useCallback(() => {
    if (!hasLoadedPicture) {
      setHasLoadedPicture(true);
      if (pictureRef.current) {
        pictureRef.current.style.maxHeight = '100%';
      }
    }
  }, [hasLoadedPicture]);

  const imageWithoutExtension = useMemo(
    () => getImageWithoutExtension(src),
    [src]
  );

  const extension = useMemo(() => getImageExtension(src), [src]);

  const preview = useMemo(() => {
    if (!lazy) {
      return null;
    }
    return (
      <img
        ref={previewRef}
        src={`${imageWithoutExtension}@preview.jpg`}
        className={`${className} ${styles.preview} ${
          hasLoadedPicture ? styles.hidden : ''
        }`}
        loading="eager"
        onLoad={handlePreviewLoad}
        {...props}
      />
    );
  }, [
    className,
    handlePreviewLoad,
    hasLoadedPicture,
    imageWithoutExtension,
    lazy,
    props,
  ]);

  const renderSources = useCallback(() => {
    const webpImages = breakpoints.map(({ maxWidth, resizeTo }: Breakpoint) => (
      <source
        key={`${maxWidth}${resizeTo}webp`}
        srcSet={`${imageWithoutExtension}@${resizeTo / 100}x.webp`}
        media={`(max-width: ${maxWidth}px)`}
        type="image/webp"
      />
    ));
    webpImages.push(
      <source
        key={`${imageWithoutExtension}webp`}
        srcSet={`${imageWithoutExtension}.webp`}
        type="image/webp"
      />
    );
    const regularImages = breakpoints.map(
      ({ maxWidth, resizeTo }: Breakpoint) => (
        <source
          key={`${maxWidth}${resizeTo}${extension}`}
          srcSet={`${imageWithoutExtension}@${resizeTo / 100}x.${extension}`}
          media={`(max-width: ${maxWidth}px)`}
          type={getImageType(src)}
        />
      )
    );
    return (
      <>
        {webpImages}
        {regularImages}
      </>
    );
  }, [extension, imageWithoutExtension, src]);

  useEffect(() => {
    if (pictureRef.current?.complete) {
      handlePictureLoad();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (previewRef.current?.complete) {
      handlePreviewLoad();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useIntersectionObserver({
    active: hasLoadedPreview && lazy,
    target: containerRef,
    onIntersect: ([entry], observerElement) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (containerRef.current) {
          observerElement.unobserve(containerRef.current);
        }
      }
    },
  });

  const containerStyle = useMemo(() => {
    const isNumber = (value: any): boolean => /^\d+$/.test(value);
    let width = props.width || props.style?.width;
    let height = props.height || props.style?.height;
    if (isNumber(width)) {
      width = `${width}px`;
    }
    if (isNumber(height)) {
      height = `${height}px`;
    }
    return {
      ...props.style,
      width: width ? `min(${width}, 100%)` : '100%',
      minHeight: height,
    };
  }, [props.height, props.style, props.width]);

  if (enabled) {
    return (
      <div
        ref={containerRef}
        className={styles.container}
        style={containerStyle}
      >
        {preview}
        {isIntersecting && (
          <picture
            className={className}
            style={{
              visibility: hasLoadedPicture ? 'visible' : 'hidden',
              height: hasLoadedPicture ? undefined : '0',
            }}
          >
            {!hasError && renderSources()}
            <source srcSet={src} type={`image/${extension}`} />
            <img
              ref={pictureRef}
              src={src}
              className={className}
              {...props}
              onLoad={handlePictureLoad}
              onError={handleError}
              style={{
                ...props.style,
                maxHeight: lazy ? '0 !important' : undefined,
              }}
            />
          </picture>
        )}
      </div>
    );
  }
  return <img src={src} className={className} {...props} />;
};
