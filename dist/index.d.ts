import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

declare type Props = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    src: string;
};
declare const Picture: ({ src, className, ...props }: Props) => JSX.Element;

export { Picture };
