import createState from './core/state'

function HqCropper(onSubmit, {
    actionType = null,
    frameSize = 0,
    imageHeight = 0,
    imageWidth = 0,
    isDragging = false,
    onMouseDownCursorX = 0,
    onMouseDownCursorY = 0,
    onMouseDownPortalLeft = 0,
    onMouseDownPortalSize = 0,
    onMouseDownPortalTop = 0,
    portalLeft = 0,
    portalSize = 0,
    portalTop = 0,
    resultImage = '',
    source = '',
    sourceHeight = 0,
    sourceWidth = 0,
} = { }) {
    const [state, { getState, setState }] = createState({
        actionType,
        frameSize,
        imageHeight,
        imageWidth,
        isDragging,
        onMouseDownCursorX,
        onMouseDownCursorY,
        onMouseDownPortalLeft,
        onMouseDownPortalSize,
        onMouseDownPortalTop,
        portalLeft,
        portalSize,
        portalTop,
        resultImage,
        source,
        sourceHeight,
        sourceWidth,
    })

    return {
        open: () => { },
    }
}

window.HqCropper = HqCropper
