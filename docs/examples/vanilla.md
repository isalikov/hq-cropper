# Vanilla JavaScript

## Basic HTML + JS

```html
<!DOCTYPE html>
<html>
    <head>
        <title>HQ-Cropper Demo</title>
    </head>
    <body>
        <img id="preview" style="display: none; max-width: 200px;" />
        <button id="upload">Upload Image</button>

        <script type="module">
            import { HqCropper } from 'https://esm.sh/hq-cropper@4'

            const preview = document.getElementById('preview')
            const button = document.getElementById('upload')

            const cropper = HqCropper((base64) => {
                preview.src = base64
                preview.style.display = 'block'
            })

            button.addEventListener('click', () => cropper.open())
        </script>
    </body>
</html>
```

## With Bundler

```typescript
// main.ts
import { HqCropper } from 'hq-cropper'

const preview = document.getElementById('preview') as HTMLImageElement
const button = document.getElementById('upload') as HTMLButtonElement

const cropper = HqCropper(
    (base64, blob, state) => {
        preview.src = base64
        preview.style.display = 'block'
        console.log(`Cropped ${state.fileName}: ${blob?.size} bytes`)
    },
    {
        outputSize: 512,
        compression: 0.9,
    }
)

button.addEventListener('click', () => cropper.open())
```

## File Upload

```typescript
import { HqCropper } from 'hq-cropper'

const cropper = HqCropper(async (base64, blob, state) => {
    if (!blob) return

    // Show preview
    document.getElementById('preview').src = base64

    // Upload
    const formData = new FormData()
    formData.append('image', blob, state.fileName)

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        })

        const { url } = await response.json()
        document.getElementById('result').textContent = `Uploaded: ${url}`
    } catch (error) {
        document.getElementById('error').textContent = error.message
    }
})

document.getElementById('upload-btn').addEventListener('click', () => {
    cropper.open()
})
```

## Avatar Component (Class-based)

```typescript
import { HqCropper, type HqCropperInstance, type IConfig } from 'hq-cropper'

class AvatarUploader {
    private cropper: HqCropperInstance
    private previewEl: HTMLImageElement
    private currentBlob: Blob | null = null

    constructor(
        buttonSelector: string,
        previewSelector: string,
        config?: Partial<IConfig>
    ) {
        this.previewEl = document.querySelector(previewSelector)!

        this.cropper = HqCropper(
            (base64, blob) => {
                this.previewEl.src = base64
                this.previewEl.style.display = 'block'
                this.currentBlob = blob
            },
            { outputSize: 256, ...config }
        )

        document
            .querySelector(buttonSelector)!
            .addEventListener('click', () => this.open())
    }

    open() {
        this.cropper.open()
    }

    getBlob(): Blob | null {
        return this.currentBlob
    }

    clear() {
        this.previewEl.src = ''
        this.previewEl.style.display = 'none'
        this.currentBlob = null
    }
}

// Usage
const avatarUploader = new AvatarUploader('#upload-btn', '#preview', {
    type: 'jpeg',
    compression: 0.8,
})

// Get blob for form submission
document.querySelector('form')!.addEventListener('submit', (e) => {
    e.preventDefault()
    const blob = avatarUploader.getBlob()
    if (blob) {
        // Submit blob...
    }
})
```

## Multiple Instances

```html
<div class="user-1">
    <img id="avatar-1" />
    <button id="btn-1">User 1 Avatar</button>
</div>

<div class="user-2">
    <img id="avatar-2" />
    <button id="btn-2">User 2 Avatar</button>
</div>

<script type="module">
    import { HqCropper } from 'hq-cropper'

    const createCropper = (btnId, imgId) => {
        const img = document.getElementById(imgId)
        const btn = document.getElementById(btnId)

        const cropper = HqCropper(
            (base64) => {
                img.src = base64
            },
            { outputSize: 256 }
        )

        btn.addEventListener('click', () => cropper.open())
    }

    createCropper('btn-1', 'avatar-1')
    createCropper('btn-2', 'avatar-2')
</script>
```

## Custom Styling

```html
<style>
    .dark-modal {
        background: #1a1a1a;
        color: #fff;
        border-radius: 12px;
    }
    .dark-header {
        background: #2a2a2a;
        border-bottom: 1px solid #333;
    }
    .btn-primary {
        background: #3b82f6;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
    }
    .btn-secondary {
        background: #4a4a4a;
        color: #ccc;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
    }
</style>

<script type="module">
    import { HqCropper } from 'hq-cropper'

    const cropper = HqCropper(
        (base64) => console.log(base64),
        {},
        {
            container: ['dark-modal'],
            header: ['dark-header'],
            applyButton: ['btn-primary'],
            cancelButton: ['btn-secondary'],
        }
    )

    document.getElementById('open').addEventListener('click', () => {
        cropper.open()
    })
</script>
```
