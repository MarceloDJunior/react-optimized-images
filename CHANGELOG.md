# [2.1.0](https://github.com/MarceloDJunior/react-optimized-images/compare/v2.0.1...v2.1.0) (2022-06-16)


### Features

* add custom preview during lazy load ([e5479eb](https://github.com/MarceloDJunior/react-optimized-images/commit/e5479eb064524e8e9452b35586d3f80fd7581227))
* add default lazy load option in webpack custom config ([0a19715](https://github.com/MarceloDJunior/react-optimized-images/commit/0a19715e56b5cd8d1fcf8ad61dcfbc335fa0afec))
* add lazy load to images ([60339c0](https://github.com/MarceloDJunior/react-optimized-images/commit/60339c07db54fcd2282bfa7105d81151d66a922a))
* add lazy option in picture props ([c092850](https://github.com/MarceloDJunior/react-optimized-images/commit/c092850caafb6e6651f7d920c9ea7bfef5b52200))
* generate blurred preview images ([0f8cac4](https://github.com/MarceloDJunior/react-optimized-images/commit/0f8cac4eb44f09904b903ccececdeb1ce83602c6))



## [2.0.1](https://github.com/MarceloDJunior/react-optimized-images/compare/v2.0.0...v2.0.1) (2022-06-07)


### Bug Fixes

* update npm version over unpublished one ([736f3cd](https://github.com/MarceloDJunior/react-optimized-images/commit/736f3cd41725bb0554340f79b467c4cfb9d0716c))



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



