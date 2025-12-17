# React

## Basic Example

```tsx
import { useRef, useState } from 'react'
import { HqCropper } from 'hq-cropper'

function AvatarUpload() {
    const [avatar, setAvatar] = useState<string>('')

    const cropperRef = useRef(HqCropper((base64) => setAvatar(base64)))

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

## With Configuration

```tsx
import { useRef, useState } from 'react'
import { HqCropper, type IState } from 'hq-cropper'

function ProfilePicture() {
    const [image, setImage] = useState<string>('')
    const [fileName, setFileName] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const cropperRef = useRef(
        HqCropper(
            (base64, blob, state: IState) => {
                setImage(base64)
                setFileName(state.fileName)
                setError(null)
            },
            {
                outputSize: 256,
                type: 'jpeg',
                compression: 0.8,
                maxFileSize: 5 * 1024 * 1024,
            },
            undefined,
            (message) => setError(message)
        )
    )

    return (
        <div className="profile-picture">
            {error && <div className="error">{error}</div>}

            {image ? (
                <div>
                    <img src={image} alt="Profile" />
                    <p>{fileName}</p>
                </div>
            ) : (
                <div className="placeholder">No image</div>
            )}

            <button onClick={() => cropperRef.current.open()}>
                {image ? 'Change' : 'Upload'}
            </button>
        </div>
    )
}
```

## Custom Hook

```tsx
import { useRef, useState, useCallback } from 'react'
import { HqCropper, type IConfig, type IState } from 'hq-cropper'

interface UseCropperOptions {
    config?: Partial<IConfig>
    onError?: (error: string) => void
}

function useCropper(options: UseCropperOptions = {}) {
    const [image, setImage] = useState<string | null>(null)
    const [blob, setBlob] = useState<Blob | null>(null)
    const [state, setState] = useState<IState | null>(null)

    const cropperRef = useRef(
        HqCropper(
            (base64, blobData, stateData) => {
                setImage(base64)
                setBlob(blobData)
                setState(stateData)
            },
            options.config,
            undefined,
            options.onError
        )
    )

    const open = useCallback(() => {
        cropperRef.current.open()
    }, [])

    const clear = useCallback(() => {
        setImage(null)
        setBlob(null)
        setState(null)
    }, [])

    return { image, blob, state, open, clear }
}

// Usage
function App() {
    const { image, open, clear } = useCropper({
        config: { outputSize: 512 },
        onError: (e) => alert(e),
    })

    return (
        <div>
            {image && <img src={image} alt="" />}
            <button onClick={open}>Select</button>
            {image && <button onClick={clear}>Clear</button>}
        </div>
    )
}
```

## With Form Submission

```tsx
import { useRef, useState, FormEvent } from 'react'
import { HqCropper } from 'hq-cropper'

function RegistrationForm() {
    const [avatar, setAvatar] = useState<Blob | null>(null)
    const [preview, setPreview] = useState<string>('')
    const [name, setName] = useState('')

    const cropperRef = useRef(
        HqCropper(
            (base64, blob) => {
                setPreview(base64)
                setAvatar(blob)
            },
            { outputSize: 256 }
        )
    )

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        if (avatar) {
            formData.append('avatar', avatar, 'avatar.jpg')
        }

        await fetch('/api/register', {
            method: 'POST',
            body: formData,
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {preview && <img src={preview} alt="Avatar preview" />}
                <button type="button" onClick={() => cropperRef.current.open()}>
                    Upload Avatar
                </button>
            </div>

            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />

            <button type="submit">Register</button>
        </form>
    )
}
```

## With Tailwind CSS

```tsx
import { useRef, useState } from 'react'
import { HqCropper } from 'hq-cropper'

function TailwindExample() {
    const [image, setImage] = useState('')

    const cropperRef = useRef(
        HqCropper(
            (base64) => setImage(base64),
            { outputSize: 256 },
            {
                container: ['rounded-xl', 'shadow-2xl'],
                header: ['bg-gray-100', 'text-gray-800'],
                applyButton: [
                    'bg-blue-500',
                    'hover:bg-blue-600',
                    'text-white',
                    'px-4',
                    'py-2',
                    'rounded-lg',
                ],
                cancelButton: [
                    'bg-gray-200',
                    'hover:bg-gray-300',
                    'text-gray-700',
                    'px-4',
                    'py-2',
                    'rounded-lg',
                ],
            }
        )
    )

    return (
        <div className="flex flex-col items-center gap-4">
            {image && (
                <img
                    src={image}
                    alt="Cropped"
                    className="w-32 h-32 rounded-full"
                />
            )}
            <button
                onClick={() => cropperRef.current.open()}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Upload
            </button>
        </div>
    )
}
```
