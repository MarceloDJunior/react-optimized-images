# [2.0.0](https://github.com/MarceloDJunior/react-optimized-images/compare/v1.2.2...v2.0.0) (2022-06-07)


### Bug Fixes

* add exports to enable jest mocks ([1a6dfe6](https://github.com/MarceloDJunior/react-optimized-images/commit/1a6dfe65dcd92a0cd29f2b66d33853470488b6e9))


### Features

* add enabled option ([479f340](https://github.com/MarceloDJunior/react-optimized-images/commit/479f3406b6757b5c9169ad326e7543aa548168cd))
* add images generation with custom configuration at build time ([cefb9d0](https://github.com/MarceloDJunior/react-optimized-images/commit/cefb9d0c4d806ff7984a3f9c6fe895828ed567b2))
* add Next.js plugin ([db657b7](https://github.com/MarceloDJunior/react-optimized-images/commit/db657b75695afda24a64db1707cbef61c6f67b5b))


### BREAKING CHANGES

* `convert-images` script is no longer supported. Please add `react-optimized-images/plugin` in your webpack config to generate optimized images. Instructions are available in the README.



## [1.2.2](https://github.com/MarceloDJunior/react-optimized-images/compare/v1.2.1...v1.2.2) (2022-05-29)


### Bug Fixes

* add className to picture component to avoid wrong style render ([c928054](https://github.com/MarceloDJunior/react-optimized-images/commit/c928054290ff274bb8f29d34c67a57928d51edee))



## [1.2.1](https://github.com/MarceloDJunior/react-optimized-images/compare/v1.2.0...v1.2.1) (2022-05-29)


### Performance Improvements

* support only esm components to create a lighter bundle but keep script as cjs ([ca1dfa2](https://github.com/MarceloDJunior/react-optimized-images/commit/ca1dfa2be7803f4696e1d444bd452da4a741d2c9))



# [1.2.0](https://github.com/MarceloDJunior/react-optimized-images/compare/v1.1.1...v1.2.0) (2022-05-29)


### Features

* add different size images for better performance on mobile ([51fd933](https://github.com/MarceloDJunior/react-optimized-images/commit/51fd933cae1c7ec9523fedb047f41d406daef7ba))



## 1.1.1 (2022-05-25)


### Bug Fixes

* fix dependencies not being installed ([3506ed4](https://github.com/MarceloDJunior/react-optimized-images/commit/3506ed43d74e1f97d8887de46fba03dc0b2f0367))


### Features

* add Picture component ([7a184f5](https://github.com/MarceloDJunior/react-optimized-images/commit/7a184f52b1167c33d3d6199411c31f799fca0a56))
* add webp generator script ([e2b1295](https://github.com/MarceloDJunior/react-optimized-images/commit/e2b129530d6aa2ac903d756c9ff395f2e7804cd7))
* handle image loading errors ([39633ad](https://github.com/MarceloDJunior/react-optimized-images/commit/39633ad5624106eea9be8d1dd768e4055936568b))



