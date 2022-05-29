# react-optimized-images

A light package to optimize images for React! It generates and uses webp images with fallback to other formats, keeping great performance on modern browsers and still supporting old browsers.

NOTE: There is an issue using with Next.js in dev mode, see the workaround [here](#nextjs-issue).

## Table of contents

- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
  - [Generate webp images](#generate-webp-images)
  - [Picture component](#picture-component)
- [Next.js issue](#nextjs-issue)

## Installation

```
npm install react-optimized-images --save
```

or

```
yarn add react-optimized-images
```

## Usage

### Generate webp images

Add a script entry in package json as follows:

```json
{
  "convert-images": "npx convert-images"
}
```

And call it after build:

```json
{
  "build": "react-scripts build && npm run convert-images"
}
```

#### Options

The default build folder to look for images is `build`, but you can change to which folder you want using the parameter `--build-folder`.

Example with Next.js:

```json
{
  "convert-images": "npx convert-images --build-folder .next"
}
```

### Picture component

For an easier use of the generated images, you can use the `Picture` component, a wrapper for html `<picture>` tag. It looks for the generated webp image, based on the `src` property, and uses the default `src` as a fallback for older browsers, providing full support to all browsers.

#### Usage

```javascript
import React from 'react'
import { Picture } from 'react-optimized-images'

import CoffeeJpg from '../assets/coffee.jpg'

export default function Home() {
  return (
    <div>
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
  <source srcset="/coffee@0.5x.webp" media="(max-width: 576px)" type="image/webp">
  <source srcset="/coffee@0.7x.webp" media="(max-width: 992px)" type="image/webp">
  <source srcset="/coffee.webp" type="image/webp" />
  <source srcset="/coffee@0.5x.jpeg" media="(max-width: 576px)" type="image/jpeg">
  <source srcset="/coffee@0.7x.jpeg" media="(max-width: 992px)" type="image/jpeg">
  <source srcset="/coffee.jpg" type="image/jpeg" />
  <img src="/coffee.jpg" />
</picture>
```

#### Properties

It uses the same properties from HTML `<img>` tag. The only mandatory property is `src`.

## Next.js issue

The picture component uses `<img>` onError event to determine if the webp image was found or not. In Next.js, this event is never triggered, so the images may be missing in dev mode. To avoid unnecessary fetch and keep this package light, I recommend to conditionally use a regular `<img>` in dev mode and use the `Picture` component only in production.

Example:

```javascript
import React from 'react'
import { Picture } from 'react-optimized-images'

export const Image = () => {
  if (process.env.NODE_ENV === 'development') {
    return <img src="/coffee.jpg" />
  }

  return <Picture src="/coffee.jpg" />
}
```
