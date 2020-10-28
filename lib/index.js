import mount from './ui/mount'
import render from './ui/render'

import createState, { subscribe } from './state'
import getCssClassNames from './css'

function HqCropper(onSubmit, {
    x = 0,
    y = 0,

    size = 600,
    caretSize = 200,

    quality = 1.03,

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

    subscribe('resultImage', (value) => {
        document.querySelector(`.${cssClassNames.resultImage}`)
            .setAttribute('src', value)

        document.querySelector(`.${cssClassNames.resultImageSquare}`)
            .setAttribute('src', value)
    })

    subscribe('portalLeft', (value) => {
        const viewContentNode = document.querySelector(`.${cssClassNames.viewContent}`)
        const fakeSourceNode = document.querySelector(`.${cssClassNames.fakeSourceImage}`)

        if (viewContentNode && viewContentNode.style) {
            viewContentNode.style.left = `${value}px`
        }

        if (fakeSourceNode && fakeSourceNode.style) {
            fakeSourceNode.style.marginLeft = `${-value}px`
        }
    })

    subscribe('portalTop', (value) => {
        const viewContentNode = document.querySelector(`.${cssClassNames.viewContent}`)
        const fakeSourceNode = document.querySelector(`.${cssClassNames.fakeSourceImage}`)

        if (viewContentNode && viewContentNode.style) {
            viewContentNode.style.top = `${value}px`
        }

        if (fakeSourceNode && fakeSourceNode.style) {
            fakeSourceNode.style.marginTop = `${-value}px`
        }
    })

    subscribe('portalSize', (value) => {
        const viewContentNode = document.querySelector(`.${cssClassNames.viewContent}`)

        if (viewContentNode && viewContentNode.style) {
            viewContentNode.style.height = `${value}px`
            viewContentNode.style.width = `${value}px`
        }
    })

    function handleClose() {
        const node = document.querySelector(`.${cssClassNames.container}`)

        node.parentNode.removeChild(node)
    }

    function handleSubmit() {
        const { resultImage } = getState()

        const node = document.querySelector(`.${cssClassNames.container}`)

        node.parentNode.removeChild(node)
        onSubmit(resultImage)
    }

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

        const baseSize = Math.log(dxSize) / Math.log(quality)

        canvas.width = baseSize
        canvas.height = baseSize

        const existNode = document.querySelector(`.${cssClassNames.container}`)

        if (!existNode) {
            render(cssClassNames, getState(), labels)
        }

        const sourceImage = document.querySelector(`.${cssClassNames.sourceImage}`)

        canvas.getContext('2d').drawImage(sourceImage, dx, dy, dxSize, dxSize, 0, 0, baseSize, baseSize)

        setState({ resultImage: canvas.toDataURL('image/jpeg', 0.8) })
        canvas.remove()
    }

    const movePortal = (event) => {
        const {
            onMouseDownCursorX,
            onMouseDownCursorY,
            onMouseDownPortalLeft,
            onMouseDownPortalTop,
            portalSize,
            sourceHeight,
            sourceWidth,
        } = getState()

        let left = onMouseDownPortalLeft + event.pageX - onMouseDownCursorX
        let top = onMouseDownPortalTop + event.pageY - onMouseDownCursorY

        if (left < 0) {
            left = 0
        }

        if (top < 0) {
            top = 0
        }

        if (left > sourceWidth - portalSize) {
            left = sourceWidth - portalSize
        }

        if (top > sourceHeight - portalSize) {
            top = sourceHeight - portalSize
        }

        setState({
            portalLeft: left,
            portalTop: top,
        })
    }

    const resizePortal = (event, actionType) => {
        const {
            onMouseDownCursorX,
            onMouseDownCursorY,
            onMouseDownPortalLeft,
            onMouseDownPortalSize,
            onMouseDownPortalTop,
            sourceHeight,
            sourceWidth,
        } = getState()

        const shiftX = event.pageX - onMouseDownCursorX
        const shiftY = event.pageY - onMouseDownCursorY

        if (actionType === 'br') {
            let brSize = onMouseDownPortalSize + Math.max(shiftX, shiftY)

            if (onMouseDownPortalTop + brSize > sourceHeight) {
                brSize = sourceHeight - onMouseDownPortalTop
            }

            if (onMouseDownPortalLeft + brSize > sourceWidth) {
                brSize = sourceWidth - onMouseDownPortalLeft
            }

            setState({
                portalSize: brSize,
            })
        }

        if (actionType === 'tr') {
            let trSize = shiftX + shiftY > 0
                ? onMouseDownPortalSize + shiftX
                : onMouseDownPortalSize - shiftY

            let top = shiftX + shiftY > 0
                ? onMouseDownPortalTop - shiftX
                : onMouseDownPortalTop + shiftY

            if (onMouseDownPortalLeft + trSize > sourceWidth) {
                trSize = sourceWidth - onMouseDownPortalLeft
                top = onMouseDownPortalTop - sourceWidth + onMouseDownPortalLeft + onMouseDownPortalSize
            }

            if (top < 0) {
                trSize = onMouseDownPortalTop + onMouseDownPortalSize
                top = 0
            }

            setState({
                portalSize: trSize,
                portalTop: top,
            })
        }

        if (actionType === 'tl') {
            let tlSize = shiftX - shiftY < 0
                ? onMouseDownPortalSize - shiftX
                : onMouseDownPortalSize - shiftY

            let left = shiftX - shiftY < 0
                ? onMouseDownPortalLeft + shiftX
                : onMouseDownPortalLeft + shiftY

            let top = shiftX - shiftY < 0
                ? onMouseDownPortalTop + shiftX
                : onMouseDownPortalTop + shiftY

            if (top < 0) {
                left = onMouseDownPortalLeft - onMouseDownPortalTop
                tlSize = onMouseDownPortalTop + onMouseDownPortalSize
                top = 0
            }

            if (left < 0) {
                left = 0
                tlSize = onMouseDownPortalLeft + onMouseDownPortalSize
                top = onMouseDownPortalTop - onMouseDownPortalLeft
            }

            setState({
                portalLeft: left,
                portalSize: tlSize,
                portalTop: top,
            })
        }

        if (actionType === 'bl') {
            let blSize = shiftX + shiftY > 0
                ? onMouseDownPortalSize + shiftY
                : onMouseDownPortalSize - shiftX

            let left = shiftX + shiftY > 0
                ? onMouseDownPortalLeft - shiftY
                : onMouseDownPortalLeft + shiftX

            if (blSize + onMouseDownPortalTop > sourceHeight) {
                left = onMouseDownPortalLeft - sourceHeight + onMouseDownPortalTop + onMouseDownPortalSize
                blSize = sourceHeight - onMouseDownPortalTop
            }

            if (left < 0) {
                left = 0
                blSize = onMouseDownPortalLeft + onMouseDownPortalSize
            }

            setState({
                portalLeft: left,
                portalSize: blSize,
            })
        }
    }

    const handleMouseMove = (event) => {
        const {
            actionType,
            isDragging,
        } = getState()

        if (!isDragging) {
            event.preventDefault()
            return false
        }

        if (actionType === 'move') {
            movePortal(event)
        } else {
            resizePortal(event, actionType)
        }

        return true
    }

    const handleMouseUp = () => {
        setState({ isDragging: false })
        handleCrop()
    }

    const handleMouseDown = (event) => {
        const { portalLeft, portalSize, portalTop } = getState()

        const actionType = event.target.getAttribute('data-action')
            ? event.target.getAttribute('data-action')
            : event.target.parentNode.getAttribute('data-action')

        setState({
            actionType,
            isDragging: true,
            onMouseDownCursorX: event.pageX,
            onMouseDownCursorY: event.pageY,
            onMouseDownPortalLeft: portalLeft,
            onMouseDownPortalSize: portalSize,
            onMouseDownPortalTop: portalTop,
        })
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

                document.querySelector(`.${cssClassNames.container}`)
                    .addEventListener('mousemove', handleMouseMove)

                document.querySelector(`.${cssClassNames.container}`)
                    .addEventListener('mouseup', handleMouseUp)

                document.querySelector(`.${cssClassNames.viewContent}`)
                    .addEventListener('mousedown', handleMouseDown)

                document.querySelector(`.${cssClassNames.cancelButton}`)
                    .addEventListener('click', handleClose)

                document.querySelector(`.${cssClassNames.submitButton}`)
                    .addEventListener('click', handleSubmit)
            }
        }

        reader.readAsDataURL(file)
        // event.target.value = ''
    }

    /** Mount instance */
    const mountNode = mount(handleChange)

    return {
        open: () => {
            mountNode.click()
        },
    }
}

window.HqCropper = HqCropper
