# Configuration Options

HQ-Cropper accepts a configuration object as the second parameter.

```typescript
const cropper = HqCropper(onSubmit, {
    outputSize: 512,
    compression: 0.8,
    type: 'jpeg',
})
```

## All Options

| Option              | Type                           | Default               | Description                                    |
| ------------------- | ------------------------------ | --------------------- | ---------------------------------------------- |
| `portalSize`        | `number`                       | `150`                 | Initial size of crop portal in pixels          |
| `minPortalSize`     | `number`                       | `50`                  | Minimum portal size (prevents too small crops) |
| `portalPosition`    | `[number, number] \| 'center'` | `'center'`            | Initial portal position                        |
| `framePadding`      | `number`                       | `3`                   | Padding around the image frame                 |
| `outputSize`        | `number`                       | `0`                   | Output size in pixels (0 = original selection) |
| `compression`       | `number`                       | `1`                   | JPEG compression (0-1, where 1 is best)        |
| `type`              | `'jpeg' \| 'png'`              | `'jpeg'`              | Output image format                            |
| `maxFileSize`       | `number`                       | `0`                   | Max input file size in bytes (0 = no limit)    |
| `allowedTypes`      | `string[]`                     | `['image/jpeg', ...]` | Allowed MIME types                             |
| `applyButtonLabel`  | `string`                       | `'Apply'`             | Apply button text                              |
| `cancelButtonLabel` | `string`                       | `'Cancel'`            | Cancel button text                             |

## Output Size

The `outputSize` option controls the dimensions of the cropped image:

```typescript
// Always output 512x512 pixels
const cropper = HqCropper(onSubmit, {
    outputSize: 512,
})

// Use original selection size (default)
const cropper = HqCropper(onSubmit, {
    outputSize: 0,
})
```

::: tip
Use a fixed `outputSize` for consistent avatar sizes across your application.
:::

## Image Format & Compression

```typescript
// High quality PNG (lossless)
const cropper = HqCropper(onSubmit, {
    type: 'png',
    compression: 1,
})

// Compressed JPEG for smaller files
const cropper = HqCropper(onSubmit, {
    type: 'jpeg',
    compression: 0.7, // 70% quality
})
```

## File Validation

Restrict allowed file types and sizes:

```typescript
const cropper = HqCropper(
    onSubmit,
    {
        maxFileSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png'],
    },
    undefined,
    (error) => {
        alert(error) // Show validation error
    }
)
```

## Custom Labels

Localize button labels:

```typescript
// Russian
const cropper = HqCropper(onSubmit, {
    applyButtonLabel: 'Применить',
    cancelButtonLabel: 'Отмена',
})

// German
const cropper = HqCropper(onSubmit, {
    applyButtonLabel: 'Anwenden',
    cancelButtonLabel: 'Abbrechen',
})
```

## Portal Configuration

Control the crop selection area:

```typescript
const cropper = HqCropper(onSubmit, {
    portalSize: 200, // Initial size
    minPortalSize: 100, // Minimum size
    framePadding: 10, // Padding around image
})
```
