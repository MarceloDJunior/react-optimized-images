declare type Breakpoint = {
  maxWidth: number
  resizeTo: number
}
declare type Options = {
  minWidth?: number
  breakpoints?: Breakpoint[]
}
declare class OptimizedImagesPlugin {
  constructor(options: Options)
}
declare module OptimizedImagesPlugin {
  export function apply(compiler: any): void
}
declare module 'react-optimized-images/plugin' {
  export = OptimizedImagesPlugin
}
