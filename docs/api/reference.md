# API Reference

## HqCropper

Creates a new cropper instance.

```typescript
function HqCropper(
    onSubmit: SubmitHandler,
    config?: Partial<IConfig>,
    css?: Partial<IClassNames>,
    onError?: ErrorHandler
): HqCropperInstance
```

### Parameters

#### onSubmit

**Type:** `(base64: string, blob: Blob | null, state: IState) => void`

Called when user applies the crop. Receives:

- `base64` — Cropped image as base64 data URL
- `blob` — Cropped image as Blob (for uploading)
- `state` — Current state including original filename

```typescript
const cropper = HqCropper((base64, blob, state) => {
    // Display preview
    img.src = base64

    // Upload to server
    const formData = new FormData()
    formData.append('avatar', blob, state.fileName)
    fetch('/upload', { method: 'POST', body: formData })
})
```

#### config

**Type:** `Partial<IConfig>`

Optional configuration object. See [Configuration](/guide/configuration) for all options.

```typescript
const cropper = HqCropper(onSubmit, {
    outputSize: 512,
    type: 'png',
})
```

#### css

**Type:** `Partial<IClassNames>`

Optional CSS class overrides. See [Custom Styling](/guide/styling) for details.

```typescript
const cropper = HqCropper(
    onSubmit,
    {},
    {
        applyButton: ['btn', 'btn-primary'],
    }
)
```

#### onError

**Type:** `(message: string) => void`

Optional error handler. Called on validation or processing errors.

```typescript
const cropper = HqCropper(
    onSubmit,
    { maxFileSize: 5 * 1024 * 1024 },
    undefined,
    (error) => alert(error)
)
```

### Returns

#### HqCropperInstance

```typescript
interface HqCropperInstance {
    open: () => void
}
```

##### open()

Opens the file picker dialog. When user selects an image, the cropper modal appears.

```typescript
const cropper = HqCropper(onSubmit)

button.addEventListener('click', () => {
    cropper.open()
})
```

## IConfig

Configuration options interface.

```typescript
interface IConfig {
    portalSize: number
    minPortalSize: number
    portalPosition: [number, number] | 'center'
    framePadding: number
    outputSize: number
    compression: number
    type: 'jpeg' | 'png'
    maxFileSize: number
    allowedTypes: string[]
    applyButtonLabel: string
    cancelButtonLabel: string
}
```

### Default Values

```typescript
{
    portalSize: 150,
    minPortalSize: 50,
    portalPosition: 'center',
    framePadding: 3,
    outputSize: 0,
    compression: 1,
    type: 'jpeg',
    maxFileSize: 0,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    applyButtonLabel: 'Apply',
    cancelButtonLabel: 'Cancel',
}
```

## IState

State object passed to `onSubmit` callback.

```typescript
interface IState {
    fileName: string
    sourceBase64: string
    sourceWidth: number
    sourceHeight: number
    // ... internal properties
}
```

### Useful Properties

- `fileName` — Original file name (e.g., `"photo.jpg"`)
- `sourceWidth` — Original image width
- `sourceHeight` — Original image height
