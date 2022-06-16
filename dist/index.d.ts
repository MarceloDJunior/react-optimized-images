import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

declare type PictureProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    src: string;
    lazy?: boolean;
    preview?: React.ReactNode;
};
declare const Picture: ({ src, className, lazy, preview, ...props }: PictureProps) => JSX.Element;

export { Picture };
