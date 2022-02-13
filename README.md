[![Build Status](https://cloud.drone.io/api/badges/isalikov/hq-cropper/status.svg)](https://cloud.drone.io/isalikov/hq-cropper)
[![npm version](https://badge.fury.io/js/hq-cropper.svg)](https://badge.fury.io/js/hq-cropper)


# [hq-cropper](https://isalikov.github.io/hq-cropper)

Lightweight (20kb) high resolution images cropper tool

> [Demo](https://isalikov.github.io/hq-cropper)

![preview](https://github.com/isalikov/hq-cropper/blob/master/images/preview.gif?raw=true)

---

### Installation
Add `hq-cropper@latest` script to your document
```html
<script src="https://unpkg.com/hq-cropper@latest/dist/hq-cropper.js"></script>
```

or install as CommonJS module
- `npm install hq-cropper`
- `import HqCropper from 'hq-cropper'`


### Usage Example
- Init `HqCropper` instance with `onChange` callback
```javascript

// As example, croppedImage (base64:jpeg) will be set as src to img#image-preview
function handleCrop(croppedImage) {
    document.querySelector('img#image-preview').setAttribute('src', croppedImage)
}

// Instance config [optional]
const config = {
    x = 0, // initial X position of crop caret
    y = 0, // initial Y position of crop caret
    
    caretSize = 200, // initial caret size (width/height)
    size = 600, // cropped portal size (width/height)
    
    compression = 0.8 // result image compression
    quality = 1.03, // result image quality
    type = 'jpeg' // result image type [String('jpeg'), String('png')]

    css = { }, // css class names to override default style
    
    center = false // if true will set crop careet at center (will override X, Y props)

    labels = {
        cancelButton: 'Cancel', // cancel button text
        submitButton: 'Apply', // submit button text
    },
}

const hqCropper = HqCropper(handleCrop, config)
```

- Call `hqCropper.open()` to open image file dialog
```javascript

// As example, click to button#change-image-button will open dialog
document.querySelector('button#change-image-button')
    .addEventListener('click', hqCropper.open, false)
``` 

- You can find full example [here](https://github.com/isalikov/hq-cropper/tree/master/docs)

### React usage

```javascript
import { useMemo } from 'react'
import HqCropper from 'hq-cropper'

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


### Understanding image qualty variable
`config.quality` variable is a logarithm base of getting result image width and height.

###### Example
- For `config.quality === 1.03` and original cropped caret image `100px`, result image will be `155px`
- For `config.quality === 1.03` and original cropped caret image `1000px`, result image will be `233px`

###### Correlation
![correlation](https://github.com/isalikov/hq-cropper/blob/master/images/correlation.png?raw=true)

### UI Customizing
You can override default class names by passing your custom `config.css` object.

```js
const css = {
    actions: String,
    cancelButton: String,
    container: String,
    dotBL: String,
    dotBR: String,
    dotTL: String,
    dotTR: String,
    fakeSourceImage: String,
    fakeViewContent: String,
    frame: String,
    handler: String,
    portal: String,
    preview: String,
    resultContainer: String,
    resultImage: String,
    shadow: String,
    sourceImage: String,
    submitButton: String,
    viewContent: String,
    resultImageSquare: String,
}
```

You can find default css styles [here](https://github.com/isalikov/hq-cropper/blob/master/lib/css.js#L26)
