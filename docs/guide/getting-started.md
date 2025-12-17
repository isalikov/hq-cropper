# Getting Started

HQ-Cropper is a lightweight, zero-dependency image cropper for creating high-quality square crops. Perfect for profile pictures, avatars, and thumbnails.

## Features

- **Zero dependencies** — pure TypeScript
- **Mobile-friendly** — full touch support
- **Customizable** — override CSS classes, inherit fonts
- **Framework agnostic** — React, Vue, Angular, vanilla JS
- **High quality** — configurable output size and compression
- **Validation** — built-in file type and size checks

## Installation

::: code-group

```bash [npm]
npm install hq-cropper
```

```bash [pnpm]
pnpm add hq-cropper
```

```bash [yarn]
yarn add hq-cropper
```

:::

## Basic Usage

```typescript
import { HqCropper } from 'hq-cropper'

// Create cropper instance
const cropper = HqCropper((base64, blob, state) => {
    // Handle cropped image
    console.log('Base64:', base64)
    console.log('Blob:', blob)
    console.log('Original filename:', state.fileName)
})

// Open file picker when user clicks a button
document.querySelector('#upload-btn').addEventListener('click', () => {
    cropper.open()
})
```

## What's Next?

- [Configuration Options](/guide/configuration) — customize output size, compression, and more
- [Custom Styling](/guide/styling) — override CSS classes for your design
- [Framework Examples](/examples/react) — React, Vue, and vanilla JS examples
