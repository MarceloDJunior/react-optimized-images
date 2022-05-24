# react-optimized-images

> A light package to generate and use webp images, keeping old browsers support.

## Table of contents

- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
  - [Generate webp images](#generate-webp-images)
  - [Picture component](#picture-component)

## Installation

```
npm install react-optimized-images
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

The default build folder to look is `build` but you can change to which folder you want using the parameter `--build-folder`.

Example with Next.js:

```json
{
  "convert-images": "npx convert-images --build-folder .next"
}
```

### Picture component

For an easier use of the generated images, you can use the `Picture` component, a wrapper for html `<picture>` tag. It looks for the generated webp image, based on the `src` property, and uses the default `src` as a fallback for older browsers, providing browsers full support.

#### Usage

```javascript
import React from 'react'
import { Picture } from 'react-image-optimization'

import CoffeeJpg from '../assets/coffee.jpg'

export default function Home() {
  return (
    <div>
      <Picture src={CoffeeJpg.src} />
      {/* ..or */}
      <Picture src='../assets/coffee.jpg' >
    </div>
  )
}
```

The output is

```html
<picture>
  <source srcset="../assets/coffee.webp" type="image/webp" />
  <source srcset="../assets/coffee.jpg" type="image/jpeg" />
  <img src="../assets/coffee.jpg" />
</picture>
```

#### Properties

It uses the same properties from HTML `<img>` tag. The only mandatory property is `src`.

