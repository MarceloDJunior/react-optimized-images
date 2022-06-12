import { RefObject } from 'react';
declare type Props = {
    active?: boolean;
    target: RefObject<any>;
    onIntersect: IntersectionObserverCallback;
    threshold?: number;
    rootMargin?: number;
};
export declare const useIntersectionObserver: ({ active, target, onIntersect, threshold, rootMargin, }: Props) => void;
export {};
