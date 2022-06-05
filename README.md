# react-optimized-images
[![npm version](https://badge.fury.io/js/react-optimized-images.svg)](https://badge.fury.io/js/react-optimized-images)


A package to optimize images for React! It generates and uses responsive webp images with fallback to other formats, keeping great performance on modern browsers and still supporting old browsers.

NOTE: If you created your app with CRA and it's not ejected or you don't have webpack as your bundler, you can use [v1](https://www.npmjs.com/package/react-optimized-images/v/1.2.2).

## Table of contents

- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
  - [Webpack plugin](#webpack-plugin)
  - [Next.js plugin](#nextjs-plugin)
  - [Picture component](#picture-component)
- [License](#license)

## Installation

```
npm install react-optimized-images --save
```

or

```
yarn add react-optimized-images
```

## Usage

### Webpack plugin

This package generates images at build time, so you need to add the webpack plugin in your `webpack.config.js`.

```javascript
const OptimizedImagesPlugin = require('react-optimized-images/plugin')

module.exports = {
  // ... webpack config
  plugins: [
    // ... other plugins
    new OptimizedImagesPlugin({ ...options }),
  ],
}
```

#### Options

| Name        | Type    | Default value                         | Description                                                                                           |
| ----------- | ------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| minWidth    | number  | 200                                   | Mininum image width to create smaller versions.                                                       |
| breakpoints | array   | [Default value](#default-breakpoints) | Specifies the breakpoints to generate responsive images. You can add as many breakpoints as you want. |
| enabled     | boolean | true                                  | If false, the images won't be generated and the component will render a regular image.                |

##### Default breakpoints

```javascript
[
  {
    maxWidth: 576, // Max screen width in px
    resizeTo: 50, // Percentage of original image to resize
    // Example: An image with 1000px would be resized to 500px in a 576px or smaller screen
  },
  {
    maxWidth: 992,
    resizeTo: 70,
  },
]
```

Complete custom configuration example:

```javascript
const OptimizedImagesPlugin = require('react-optimized-images/plugin')

module.exports = {
  // ... webpack config
  plugins: [
    // ... other plugins
    new OptimizedImagesPlugin({
      minWidth: 300,
      breakpoints: [
        {
          maxWidth: 576,
          resizeTo: 50,
        },
        {
          maxWidth: 992,
          resizeTo: 80,
        },
      ],
      enabled: process.env.NODE_ENV === 'production',
    }),
  ],
}
```

### Next.js plugin

This package also has a plugin for Next.js projects. In your `next.config.js` add:

```javascript
const withOptimizedImages = require('react-optimized-images/next')

module.exports = withOptimizedImages()
```

Example with custom configuration:

```javascript
const withOptimizedImages = require('react-optimized-images/next')

module.exports = withOptimizedImages({
  minWidth: 300,
  breakpoints: [
    {
      maxWidth: 576,
      resizeTo: 50,
    },
    {
      maxWidth: 992,
      resizeTo: 80,
    },
  ],
})
```

Or if you use `next-compose-plugins`:

```javascript
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('react-optimized-images/next')

module.exports = withPlugins([
  // other plugins
  [
    optimizedImages,
    /* Custom configuration
    {
       minWidth: 300
    },
    */
  ],
])
```

### Picture component

For an easier use of the generated images, you can use the `Picture` component, a wrapper for html `<picture>` tag. It looks for the optimized webp images and uses the default format as a fallback for older browsers, providing full support to all browsers.

#### Usage

```javascript
import React from 'react'
import { Picture } from 'react-optimized-images'

import CoffeeJpg from '../assets/coffee.jpg'

export default function Home() {
  return (
    <div>
      <Picture src={CoffeeJpg} />
      {/* ..with Next v11.. */}
      <Picture src={CoffeeJpg.src} />
      {/* ..or if it comes from public folder */}
      <Picture src="/coffee.jpg" />
    </div>
  )
}
```

The output will be like

```html
<picture>
  <source
    srcset="/coffee@0.5x.webp"
    media="(max-width: 576px)"
    type="image/webp"
  />
  <source
    srcset="/coffee@0.7x.webp"
    media="(max-width: 992px)"
    type="image/webp"
  />
  <source srcset="/coffee.webp" type="image/webp" />
  <source
    srcset="/coffee@0.5x.jpeg"
    media="(max-width: 576px)"
    type="image/jpeg"
  />
  <source
    srcset="/coffee@0.7x.jpeg"
    media="(max-width: 992px)"
    type="image/jpeg"
  />
  <source srcset="/coffee.jpg" type="image/jpeg" />
  <img src="/coffee.jpg" />
</picture>
```

#### Properties

It uses the same properties from HTML `<img>` tag. The only mandatory property is `src`.

## License

[MIT](https://github.com/MarceloDJunior/react-optimized-images/blob/main/LICENSE) © Marcelo Dornelles Junior