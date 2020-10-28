[![Build Status](https://travis-ci.org/isalikov/hq-cropper.svg?branch=main)](https://travis-ci.org/isalikov/hq-cropper)
[![npm version](https://badge.fury.io/js/hq-cropper.svg)](https://badge.fury.io/js/hq-cropper)


# hq-cropper

Lightweight (20kb) cropper tool for High Quality images

![preview](https://github.com/isalikov/hq-cropper/blob/main/images/example.gif?raw=true)

---

### Installation
Just add `hq-cropper@latest` to your document
```html
<script src="https://unpkg.com/hq-cropper@latest/dist/main.min.js"></script>
```


### Usage Example
- Init HqCropper instance with `onChange` callback
```javascript

// As example, croppedImage (base64:jpeg) wil be set as src to img#image-preview
function handleCrop(croppedImage) {
    document.querySelector('img#image-preview').setAttribute('src', croppedImage)
}

// Instance config [optional]
const config = {
    x = 0, // X position of crop caret
    y = 0, // Y position of crop caret

    size = 600, // cropped portal size (width/height)
    caretSize = 200, // caret size (width/height)

    quality = 1.03, // cropped image quality

    css = { }, // css class names to override default style

    labels = {
        cancelButton: 'Cancel', // cancel button text
        submitButton: 'Submit', // submit button text
    },
}

const hqCropper = HqCropper(handleCrop, config)
```

- Call `hqCropper.open()` to open select image file dialog
```javascript

// As example, click to button#change-image-button will open dialog
document.querySelector('button#change-image-button')
    .addEventListener('click', hqCropper.open, false)
``` 

- You can find full example [here](https://github.com/isalikov/hq-cropper/tree/main/example)


### Understand image qualty variable
`config.quality` variable is logarithm base of getting result image width and height.

###### Example
- For `config.quality === 1.03` and original cropped caret image `100px`, result image will be `155px`
- For `config.quality === 1.03` and original cropped caret image `1000px`, result image will be `233px`

###### Correlation
![correlation](https://github.com/isalikov/hq-cropper/blob/main/images/correlation.png?raw=true)

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
