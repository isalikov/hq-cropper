[![Build Status](https://cloud.drone.io/api/badges/isalikov/hq-cropper/status.svg)](https://cloud.drone.io/isalikov/hq-cropper)
[![npm version](https://badge.fury.io/js/hq-cropper.svg)](https://badge.fury.io/js/hq-cropper)
[![Downloads](http://img.shields.io/npm/dm/hq-cropper.svg?style=flat)](https://npmjs.org/package/hq-cropper)


# hq-cropper

#### [Become a sponsor](https://opencollective.com/hq-cropper)

Cropper for large images

> [Demo](https://isalikov.github.io/hq-cropper)

### Installation

`npm install hq-cropper`

### Usage Example
```javascript

import { HqCropper } from 'hq-cropper'

// As example, croppedImage (base64:jpeg) will be set as src to img#image-preview
function handleCrop(croppedImage) {
    document.querySelector('img#image-preview').setAttribute('src', croppedImage)
}

const hqCropper = HqCropper(handleCrop)

// As example, click to button#change-image-button will open dialog
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
    const hqCropper = useMemo(() => HqCropper(setImage), [])

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
