# hq-cropper

[![npm version](https://badge.fury.io/js/hq-cropper.svg)](https://badge.fury.io/js/hq-cropper)
[![Downloads](http://img.shields.io/npm/dm/hq-cropper.svg?style=flat)](https://npmjs.org/package/hq-cropper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, zero-dependency image cropper for high-quality square crops. Perfect for profile pictures, avatars, and thumbnails.

**[Documentation](https://hqcropper.dev)** | **[Live Demo](https://hqcropper.dev/storybook/)**

## Features

- Zero dependencies — pure TypeScript
- Mobile-friendly with full touch support
- High-quality output with configurable compression
- Square crop with resizable portal
- Drag and resize from all corners
- File validation (type and size)
- Error handling with callbacks
- Fully customizable styling
- Inherits fonts from your application
- Works with any framework (React, Vue, Angular, vanilla JS)

## Installation

```bash
npm install hq-cropper
```

```bash
pnpm add hq-cropper
```

```bash
yarn add hq-cropper
```

## Quick Start

```typescript
import { HqCropper } from 'hq-cropper'

const cropper = HqCropper((base64, blob, state) => {
    console.log('Cropped image:', base64)
    console.log('Blob:', blob)
    console.log('Original file:', state.fileName)
})

// Open file picker
document.querySelector('#crop-button').addEventListener('click', () => {
    cropper.open()
})
```

## API

### HqCropper(onSubmit, config?, css?, onError?)

Creates a new cropper instance.

```typescript
const cropper = HqCropper(
    onSubmit, // Required: callback with result
    config, // Optional: configuration options
    css, // Optional: custom CSS class names
    onError // Optional: error handler
)
```

#### Parameters

| Parameter  | Type                                                                    | Description                               |
| ---------- | ----------------------------------------------------------------------- | ----------------------------------------- |
| `onSubmit` | `(base64: string, blob: Blob \| null, state: ApplicationState) => void` | Called when user applies the crop         |
| `config`   | `Partial<ConfigurationOptions>`                                         | Configuration options                     |
| `css`      | `Partial<ClassNames>`                                                   | Custom CSS class names                    |
| `onError`  | `(message: string) => void`                                             | Called on validation or processing errors |

#### Returns

```typescript
interface HqCropperInstance {
    open: () => void // Opens file picker dialog
}
```

## Configuration

| Option              | Type                           | Default                                                  | Description                                        |
| ------------------- | ------------------------------ | -------------------------------------------------------- | -------------------------------------------------- |
| `portalSize`        | `number`                       | `150`                                                    | Initial size of crop portal in pixels              |
| `minPortalSize`     | `number`                       | `50`                                                     | Minimum portal size (prevents too small crops)     |
| `portalPosition`    | `[number, number] \| 'center'` | `'center'`                                               | Initial portal position                            |
| `framePadding`      | `number`                       | `3`                                                      | Padding around the image frame                     |
| `outputSize`        | `number`                       | `0`                                                      | Output size in pixels (0 = use original selection) |
| `compression`       | `number`                       | `1`                                                      | JPEG compression (0-1, where 1 is best quality)    |
| `type`              | `'jpeg' \| 'png'`              | `'jpeg'`                                                 | Output image format                                |
| `maxFileSize`       | `number`                       | `0`                                                      | Max input file size in bytes (0 = no limit)        |
| `allowedTypes`      | `string[]`                     | `['image/jpeg', 'image/png', 'image/gif', 'image/webp']` | Allowed MIME types                                 |
| `applyButtonLabel`  | `string`                       | `'Apply'`                                                | Apply button text                                  |
| `cancelButtonLabel` | `string`                       | `'Cancel'`                                               | Cancel button text                                 |

### Configuration Examples

#### Fixed Output Size (512x512 PNG)

```typescript
const cropper = HqCropper(onSubmit, {
    type: 'png',
    outputSize: 512,
    compression: 1,
})
```

#### Compressed JPEG for Smaller Files

```typescript
const cropper = HqCropper(onSubmit, {
    type: 'jpeg',
    outputSize: 256,
    compression: 0.7,
})
```

#### File Size Restriction

```typescript
const cropper = HqCropper(
    onSubmit,
    {
        maxFileSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png'],
    },
    undefined,
    (error) => alert(error)
)
```

#### Custom Button Labels

```typescript
const cropper = HqCropper(onSubmit, {
    applyButtonLabel: 'Сохранить',
    cancelButtonLabel: 'Отмена',
})
```

## Framework Examples

### React

```tsx
import { useRef, useState } from 'react'
import { HqCropper } from 'hq-cropper'

function AvatarUpload() {
    const [avatar, setAvatar] = useState<string>('')

    const cropperRef = useRef(
        HqCropper(
            (base64) => setAvatar(base64),
            { portalSize: 200 },
            undefined,
            (error) => console.error(error)
        )
    )

    return (
        <div>
            {avatar && <img src={avatar} alt="Avatar" />}
            <button onClick={() => cropperRef.current.open()}>
                Upload Avatar
            </button>
        </div>
    )
}
```

### Vue 3

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { HqCropper, type HqCropperInstance } from 'hq-cropper'

const avatar = ref('')
let cropper: HqCropperInstance

onMounted(() => {
    cropper = HqCropper((base64) => {
        avatar.value = base64
    })
})

const openCropper = () => cropper.open()
</script>

<template>
    <div>
        <img v-if="avatar" :src="avatar" alt="Avatar" />
        <button @click="openCropper">Upload Avatar</button>
    </div>
</template>
```

### Vanilla JavaScript

```html
<img id="preview" src="" alt="Preview" style="display: none;" />
<button id="upload-btn">Upload Image</button>

<script type="module">
    import { HqCropper } from 'hq-cropper'

    const preview = document.getElementById('preview')
    const button = document.getElementById('upload-btn')

    const cropper = HqCropper((base64, blob, state) => {
        preview.src = base64
        preview.style.display = 'block'
        console.log(`Cropped ${state.fileName}: ${blob?.size} bytes`)
    })

    button.addEventListener('click', () => cropper.open())
</script>
```

## Custom Styling

You can override default CSS classes:

```typescript
const cropper = HqCropper(
    onSubmit,
    {},
    {
        root: ['my-cropper'],
        portal: ['my-portal'],
        applyButton: ['btn', 'btn-primary'],
        cancelButton: ['btn', 'btn-secondary'],
    }
)
```

Available CSS class overrides:

| Class                      | Element                    |
| -------------------------- | -------------------------- |
| `root`                     | Root container             |
| `header`                   | Header with filename       |
| `body`                     | Main content area          |
| `footer`                   | Footer with buttons        |
| `portal`                   | Crop selection area        |
| `portalArea`               | Portal container           |
| `sourceImage`              | Source image               |
| `preview`                  | Preview container          |
| `previewImage`             | Preview image              |
| `applyButton`              | Apply button               |
| `cancelButton`             | Cancel button              |
| `handlerMove`              | Move handle                |
| `handlerResizeTopLeft`     | Top-left resize handle     |
| `handlerResizeTopRight`    | Top-right resize handle    |
| `handlerResizeBottomLeft`  | Bottom-left resize handle  |
| `handlerResizeBottomRight` | Bottom-right resize handle |

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
    HqCropperInstance,
    ConfigurationOptions,
    ClassNames,
    ApplicationState,
    ErrorHandler,
} from 'hq-cropper'
```

## Fonts

HQ-Cropper does not define any `font-family`. The cropper inherits the font from your application's CSS, ensuring seamless integration with your design system.

```css
/* Your app's CSS */
body {
    font-family:
        Inter,
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        sans-serif;
}

/* The cropper will automatically inherit this font */
```

To override fonts specifically for the cropper:

```typescript
const cropper = HqCropper(
    onSubmit,
    {},
    {
        container: ['my-cropper-container'],
    }
)
```

```css
.my-cropper-container {
    font-family: 'Custom Font', sans-serif;
}
```

## Browser Support

Works in all modern browsers that support:

- ES2020+
- Canvas API
- FileReader API
- Touch events (mobile)

## License

MIT © [Iakov Salikov](https://github.com/isalikov)
