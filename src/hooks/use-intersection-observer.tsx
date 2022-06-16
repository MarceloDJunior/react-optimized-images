import { RefObject, useEffect } from 'react';

type Props = {
  active?: boolean;
  target: RefObject<any>;
  onIntersect: IntersectionObserverCallback;
  threshold?: number;
  rootMargin?: number;
};

export const useIntersectionObserver = ({
  active = true,
  target,
  onIntersect,
  threshold = 0.1,
  rootMargin = 0,
}: Props) => {
  useEffect(() => {
    if (active) {
      setTimeout(() => {
        const observer = new IntersectionObserver(onIntersect, {
          rootMargin: `${rootMargin}px`,
          threshold,
        });
        const currentTarget = target.current;
        if (currentTarget) {
          observer.observe(currentTarget);
        }
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
};
