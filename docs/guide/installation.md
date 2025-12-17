# Installation

## Package Managers

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

## Requirements

- **Node.js** 18+ (for build tools)
- **Browser** with ES2020+ support
- **Canvas API** support
- **FileReader API** support

## ESM Only

HQ-Cropper is an ESM-only package. Make sure your project supports ES modules:

```json
// package.json
{
    "type": "module"
}
```

## TypeScript

Full TypeScript support is included. Types are exported from the main package:

```typescript
import type {
    HqCropperInstance,
    IConfig,
    IClassNames,
    IState,
    ErrorHandler,
} from 'hq-cropper'
```

## CDN Usage

You can also use HQ-Cropper via CDN:

```html
<script type="module">
    import { HqCropper } from 'https://esm.sh/hq-cropper@4'

    const cropper = HqCropper((base64) => {
        console.log(base64)
    })
</script>
```

::: warning
CDN usage is convenient for prototyping but not recommended for production. Use a package manager for better caching and bundle optimization.
:::
