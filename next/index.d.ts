declare function OptimizedImagesNextPlugin(
  options: Options & NextConfig
): void;

declare module 'react-optimized-images/next' {
  export = OptimizedImagesNextPlugin
}
