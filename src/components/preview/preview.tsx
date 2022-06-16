import React, {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './preview.module.css';

type PreviewProps = Omit<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  'ref'
> & {
  hidden?: boolean;
  onPreviewLoad: () => void;
};

const PreviewComponent = ({
  src,
  className,
  hidden,
  onPreviewLoad,
  ...props
}: PreviewProps) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const previewRef = useRef<HTMLImageElement>(null);

  const handlePreviewLoad = useCallback(() => {
    if (!hasLoaded) {
      setHasLoaded(true);
    }
  }, [hasLoaded]);

  useEffect(() => {
    if (previewRef.current?.complete) {
      handlePreviewLoad();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      onPreviewLoad();
    }
  }, [hasLoaded, onPreviewLoad]);

  return (
    <img
      ref={previewRef}
      src={src}
      className={`${className} ${styles.preview} ${
        hidden ? styles.hidden : ''
      }`}
      loading="eager"
      onLoad={handlePreviewLoad}
      {...props}
    />
  );
};

export const Preview = React.memo(PreviewComponent);
