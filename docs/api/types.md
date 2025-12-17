# TypeScript Types

All types are exported from the main package:

```typescript
import type {
    HqCropperInstance,
    IConfig,
    IClassNames,
    IState,
    ErrorHandler,
} from 'hq-cropper'
```

## HqCropperInstance

The object returned by `HqCropper()`.

```typescript
interface HqCropperInstance {
    open: () => void
}
```

## IConfig

Configuration options.

```typescript
interface IConfig {
    /** Initial size of crop portal in pixels */
    portalSize: number

    /** Minimum portal size */
    minPortalSize: number

    /** Initial portal position */
    portalPosition: [number, number] | 'center'

    /** Padding around the image frame */
    framePadding: number

    /** Output image size in pixels (0 = use original selection size) */
    outputSize: number

    /** Result image compression (0-1 for JPEG) */
    compression: number

    /** Result image type */
    type: 'jpeg' | 'png'

    /** Maximum file size in bytes (0 = no limit) */
    maxFileSize: number

    /** Allowed MIME types */
    allowedTypes: string[]

    /** Apply button text */
    applyButtonLabel: string

    /** Cancel button text */
    cancelButtonLabel: string
}
```

## IClassNames

CSS class names for customization.

```typescript
interface IClassNames {
    root: string[]
    container: string[]
    header: string[]
    body: string[]
    footer: string[]
    portal: string[]
    portalArea: string[]
    sourceImage: string[]
    preview: string[]
    previewImage: string[]
    applyButton: string[]
    cancelButton: string[]
    handlerMove: string[]
    handlerResizeTopLeft: string[]
    handlerResizeTopRight: string[]
    handlerResizeBottomLeft: string[]
    handlerResizeBottomRight: string[]
}
```

## IState

Internal state object passed to callbacks.

```typescript
interface IState {
    /** Original filename */
    fileName: string

    /** Source image as base64 */
    sourceBase64: string

    /** Original image width */
    sourceWidth: number

    /** Original image height */
    sourceHeight: number

    /** Configuration */
    config: IConfig

    /** CSS class names */
    css?: IClassNames

    /** Portal position and size */
    portal: PortalProps

    /** Frame dimensions */
    frame: FrameProps

    // ... other internal properties
}
```

## ErrorHandler

Error callback type.

```typescript
type ErrorHandler = (message: string) => void
```

## SubmitHandler

Submit callback type (not exported, shown for reference).

```typescript
type SubmitHandler = (base64: string, blob: Blob | null, state: IState) => void
```

## Usage Example

```typescript
import { HqCropper, type IConfig, type IState } from 'hq-cropper'

const config: Partial<IConfig> = {
    outputSize: 256,
    type: 'jpeg',
    compression: 0.8,
}

const handleSubmit = (base64: string, blob: Blob | null, state: IState) => {
    console.log(`Cropped ${state.fileName}`)
    console.log(`Original size: ${state.sourceWidth}x${state.sourceHeight}`)
}

const cropper = HqCropper(handleSubmit, config)
```
