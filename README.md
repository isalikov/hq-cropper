[![npm version](https://badge.fury.io/js/hq-cropper.svg)](https://badge.fury.io/js/hq-cropper)
[![Downloads](http://img.shields.io/npm/dm/hq-cropper.svg?style=flat)](https://npmjs.org/package/hq-cropper)


# hq-cropper

Cropper for large images

> [Demo](https://isalikov.github.io/hq-cropper)

### Installation

`npm install hq-cropper`

### Usage Example
```typescript
import { HqCropper } from 'hq-cropper'

function handleCrop(base64: string, blob: Blob | null) {
    document.querySelector('img#image-preview').setAttribute('src', base64)
}

const hqCropper = HqCropper(handleCrop)

document.querySelector('button#change-image-button')
    .addEventListener('click', hqCropper.open, false)

```

### React usage

```javascript
import { useMemo } from 'react'
import { HqCropper } from 'hq-cropper'

function MyComponent() {
    const [image, setImage] = useState('')

    /* Important: must be memoized */
    const { current: hqCropper } = useRef(HqCropper(setImage))

    return (
        <div>
            <img src={image} />
            <button onClick={hqCropper.open}>change</button>
        </div>
    )
}
```

 ### Configuration

`HqCropper` can be initialized with [`config`](https://github.com/isalikov/hq-cropper/blob/master/src/types.ts#L29) and [`css`](https://github.com/isalikov/hq-cropper/blob/master/src/types.ts#L9) objects.

```typescript
export type HqCropperType = (
    onSubmit: (result: string, state: IState) => void,
    config?: Partial<IConfig>,
    css?: Partial<IClassNames>
) => HqCropperInstance
```
