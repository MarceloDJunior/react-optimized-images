declare type Breakpoint = {
  maxWidth: number;
  resizeTo: number;
};
declare type Options = {
  minWidth?: number;
  breakpoints?: Breakpoint[];
  enabled?: boolean;
  lazy?: boolean;
};
declare class OptimizedImagesPlugin {
  constructor(options: Options);
}
declare namespace OptimizedImagesPlugin {
  export function apply(compiler: any): void;
}
declare module 'react-optimized-images/plugin' {
  export = OptimizedImagesPlugin;
}
