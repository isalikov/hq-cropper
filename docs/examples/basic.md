# Basic Usage

## Minimal Example

```typescript
import { HqCropper } from 'hq-cropper'

const cropper = HqCropper((base64) => {
    document.querySelector('img').src = base64
})

document.querySelector('button').addEventListener('click', () => {
    cropper.open()
})
```

## With All Options

```typescript
import { HqCropper } from 'hq-cropper'

const cropper = HqCropper(
    // 1. Submit handler
    (base64, blob, state) => {
        console.log('Base64 length:', base64.length)
        console.log('Blob size:', blob?.size)
        console.log('Original file:', state.fileName)
    },

    // 2. Configuration
    {
        outputSize: 512,
        compression: 0.9,
        type: 'jpeg',
        portalSize: 200,
        minPortalSize: 100,
        maxFileSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['image/jpeg', 'image/png'],
        applyButtonLabel: 'Crop',
        cancelButtonLabel: 'Close',
    },

    // 3. Custom CSS classes
    {
        applyButton: ['btn', 'btn-success'],
        cancelButton: ['btn', 'btn-outline'],
    },

    // 4. Error handler
    (error) => {
        console.error('Cropper error:', error)
    }
)
```

## Upload to Server

```typescript
const cropper = HqCropper(async (base64, blob, state) => {
    if (!blob) {
        console.error('No blob available')
        return
    }

    const formData = new FormData()
    formData.append('file', blob, state.fileName)

    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    })

    const { url } = await response.json()
    console.log('Uploaded to:', url)
})
```

## Preview Before Upload

```html
<div id="app">
    <img id="preview" style="display: none; max-width: 200px;" />
    <button id="upload">Select Image</button>
    <button id="submit" style="display: none;">Upload</button>
</div>
```

```typescript
import { HqCropper } from 'hq-cropper'

const preview = document.getElementById('preview')
const submitBtn = document.getElementById('submit')
let currentBlob: Blob | null = null

const cropper = HqCropper((base64, blob) => {
    preview.src = base64
    preview.style.display = 'block'
    submitBtn.style.display = 'inline-block'
    currentBlob = blob
})

document.getElementById('upload').addEventListener('click', () => {
    cropper.open()
})

submitBtn.addEventListener('click', async () => {
    if (!currentBlob) return

    const formData = new FormData()
    formData.append('avatar', currentBlob)

    await fetch('/api/avatar', {
        method: 'POST',
        body: formData,
    })

    alert('Uploaded!')
})
```

## Multiple Croppers

```typescript
import { HqCropper } from 'hq-cropper'

// Avatar cropper - small, square
const avatarCropper = HqCropper(
    (base64) => {
        avatarImg.src = base64
    },
    { outputSize: 128 }
)

// Cover cropper - larger
const coverCropper = HqCropper(
    (base64) => {
        coverImg.src = base64
    },
    { outputSize: 800, portalSize: 300 }
)

avatarBtn.addEventListener('click', () => avatarCropper.open())
coverBtn.addEventListener('click', () => coverCropper.open())
```
