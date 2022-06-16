import React, {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { breakpoints, enabled, lazy } from 'react-optimized-images/config';
import {
  getImageExtension,
  getImageType,
  getImageWithoutExtension,
} from '../../helpers/image-helper';
import { useIntersectionObserver } from '../../hooks/use-intersection-observer';
import { Preview } from '../preview/preview';

import styles from './picture.module.css';

type PictureProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  src: string;
  lazy?: boolean;
  preview?: React.ReactNode;
};

type Breakpoint = {
  maxWidth: number;
  resizeTo: number;
};

const defaultLazy = lazy || false;

export const Picture = ({
  src,
  className,
  lazy = defaultLazy,
  preview,
  ...props
}: PictureProps) => {
  const [hasError, setHasError] = useState(false);
  const [hasLoadedPreview, setHasLoadedPreview] = useState(false);
  const [hasLoadedPicture, setHasLoadedPicture] = useState(lazy ? false : true);
  const [isIntersecting, setIsIntersecting] = useState(lazy ? false : true);
  const containerRef = useRef<HTMLDivElement>(null);
  const pictureRef = useRef<HTMLImageElement>(null);

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
    }
  }, [hasError]);

  const handlePreviewLoad = useCallback(() => {
    setHasLoadedPreview(true);
  }, []);

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

  const shouldRenderPreview = useMemo(() => {
    if (!lazy) {
      return false;
    }

    if (preview) {
      return true;
    }

    const hasHeightSet = !!props.height || !!props.style?.height;
    const hasWidthSet = !!props.width || !!props.style?.width;

    return hasHeightSet && hasWidthSet;
  }, [
    lazy,
    preview,
    props.height,
    props.style?.height,
    props.style?.width,
    props.width,
  ]);

  const previewComponent = useMemo(() => {
    if (shouldRenderPreview) {
      if (preview) {
        return (
          <div
            className={`${styles['preview-container']} ${
              hasLoadedPreview ? styles.hidden : ''
            }`}
          >
            {preview}
          </div>
        );
      }
      return (
        <Preview
          src={`${imageWithoutExtension}@preview.jpg`}
          className={`${className || ''} ${
            hasLoadedPreview ? styles.hidden : ''
          }`}
          onPreviewLoad={handlePreviewLoad}
          {...props}
        />
      );
    }
    return null;
  }, [
    className,
    handlePreviewLoad,
    hasLoadedPreview,
    imageWithoutExtension,
    preview,
    props,
    shouldRenderPreview,
  ]);

  const extension = useMemo(() => getImageExtension(src), [src]);

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
    if (!shouldRenderPreview || preview) {
      handlePreviewLoad();
    }
  }, [handlePreviewLoad, preview, shouldRenderPreview]);

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
        {previewComponent}
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
