import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

declare type Props = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    src: string;
    lazy?: boolean;
};
declare const Picture: ({ src, className, lazy, ...props }: Props) => JSX.Element;

export { Picture };
