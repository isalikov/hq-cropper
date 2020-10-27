import mount from './ui/mount'
import render from './ui/render'

import createState from './core/state'
import getCssClassNames from './css'

function HqCropper(onSubmit, {
    x = 0,
    y = 0,
    size = 600,
    caretSize = 200,

    css = { },

    labels = {
        cancelButton: 'Cancel',
        submitButton: 'Submit',
    },
} = { }) {
    const { getState, setState } = createState({
        actionType: null,
        frameSize: 0,
        imageHeight: 0,
        imageWidth: 0,
        isDragging: false,
        onMouseDownCursorX: 0,
        onMouseDownCursorY: 0,
        onMouseDownPortalLeft: 0,
        onMouseDownPortalSize: 0,
        onMouseDownPortalTop: 0,
        portalLeft: 0,
        portalSize: 0,
        portalTop: 0,
        resultImage: '',
        source: '',
        sourceHeight: 0,
        sourceWidth: 0,
    })

    const cssClassNames = getCssClassNames(css)

    const handleCrop = () => {
        const {
            imageWidth,
            sourceWidth,
            portalSize,
            portalLeft,
            portalTop,
        } = getState()

        const canvas = document.createElement('canvas')

        const scale = imageWidth / sourceWidth
        const dxSize = portalSize * scale
        const dx = portalLeft * scale
        const dy = portalTop * scale

        const baseSize = Math.log(dxSize) / Math.log(1.03)

        canvas.width = baseSize
        canvas.height = baseSize

        render(cssClassNames, getState(), labels)

        const sourceImage = document.querySelector(`.${cssClassNames.sourceImage}`)

        canvas.getContext('2d').drawImage(sourceImage, dx, dy, dxSize, dxSize, 0, 0, baseSize, baseSize)

        setState({ resultImage: canvas.toDataURL('image/jpeg', 0.8) })
        canvas.remove()
    }

    function handleChange(event) {
        const file = event.target.files[0]
        const reader = new FileReader()

        reader.onload = (data) => {
            const image = new Image()

            image.src = data.target.result

            image.onload = () => {
                const width = window.screen.width > 425
                    ? size
                    : window.screen.width - 30

                const sourceHeight = image.width / image.height >= 1
                    ? (image.height * width) / image.width
                    : width

                const sourceWidth = image.width / image.height >= 1
                    ? width
                    : (width * image.width) / image.height

                setState({
                    frameSize: width,
                    imageHeight: image.height,
                    imageWidth: image.width,
                    portalLeft: y,
                    portalSize: caretSize,
                    portalTop: x,
                    source: data.target.result,
                    sourceHeight,
                    sourceWidth,
                })

                handleCrop()
            }
        }

        reader.readAsDataURL(file)
        // event.target.value = ''
    }

    render(cssClassNames, getState(), labels)

    /** Mount instance */
    const mountNode = mount(handleChange)

    return {
        open: () => {
            mountNode.click()
        },
    }
}

window.HqCropper = HqCropper
