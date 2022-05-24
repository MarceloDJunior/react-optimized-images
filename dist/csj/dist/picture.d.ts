import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
declare type Props = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    src: string;
};
export declare const Picture: ({ src, ...props }: Props) => JSX.Element;
export default Picture;
