# Error Handling

HQ-Cropper provides built-in validation and error handling through the `onError` callback.

## Basic Error Handling

```typescript
const cropper = HqCropper(
    (base64, blob, state) => {
        // Success handler
    },
    {
        maxFileSize: 5 * 1024 * 1024, // 5MB
    },
    undefined,
    (message) => {
        // Error handler
        alert(message)
    }
)
```

## Validation Errors

The cropper validates files before processing:

### File Type

```typescript
const cropper = HqCropper(
    onSubmit,
    {
        allowedTypes: ['image/jpeg', 'image/png'],
    },
    undefined,
    (error) => {
        // "Invalid file type "image/gif". Allowed types: image/jpeg, image/png"
        console.error(error)
    }
)
```

### File Size

```typescript
const cropper = HqCropper(
    onSubmit,
    {
        maxFileSize: 2 * 1024 * 1024, // 2MB
    },
    undefined,
    (error) => {
        // "File size (3.50MB) exceeds maximum allowed size (2.00MB)"
        console.error(error)
    }
)
```

## Error Types

| Error                   | Cause                                  |
| ----------------------- | -------------------------------------- |
| Invalid file type       | File MIME type not in `allowedTypes`   |
| File size exceeded      | File larger than `maxFileSize`         |
| Can't read file input   | No file selected or file access denied |
| Can't load result image | FileReader failed to read file         |
| Failed to load image    | Image failed to load (corrupt file)    |
| Failed to crop image    | Canvas processing error                |

## Default Behavior

If no `onError` callback is provided, errors are logged to console:

```typescript
// Without onError - logs to console
const cropper = HqCropper(onSubmit, {
    maxFileSize: 1024 * 1024,
})

// Console output: "HqCropper: File size (2.50MB) exceeds maximum allowed size (1.00MB)"
```

## UI Integration

### Toast Notifications

```typescript
import { toast } from 'your-toast-library'

const cropper = HqCropper(
    onSubmit,
    { maxFileSize: 5 * 1024 * 1024 },
    undefined,
    (message) => {
        toast.error(message)
    }
)
```

### React State

```tsx
const [error, setError] = useState<string | null>(null)

const cropperRef = useRef(
    HqCropper(
        (base64) => setAvatar(base64),
        { maxFileSize: 5 * 1024 * 1024 },
        undefined,
        (message) => setError(message)
    )
)

return (
    <div>
        {error && <div className="error">{error}</div>}
        <button onClick={() => cropperRef.current.open()}>Upload</button>
    </div>
)
```

## Best Practices

::: tip Inform Users
Always show meaningful error messages. The default messages are user-friendly and include specific details (file size, allowed types).
:::

::: warning Don't Ignore Errors
Even if you don't need custom UI, at least log errors for debugging:

```typescript
const cropper = HqCropper(onSubmit, config, undefined, console.error)
```

:::
