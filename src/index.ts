import { createState } from './state'
import { Options } from './types/options'

export type HqCropperType = (
    onSubmit: (img: string) => void,
    partialOptions?: Partial<Options>
) => void

const HqCropper: HqCropperType = (onSubmit, partialOptions = {}) => {
    const { getState, setState, subscribe } = createState({
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

    const options = {
        x: 0,
        y: 0,
        size: 600,
        caretSize: 200,
        compression: 0.8,
        quality: 1.03,
        type: 'jpeg',
        css: {},
        labels: {
            cancelButton: 'Cancel',
            submitButton: 'Apply',
        },
        ...partialOptions,
    }

    const handleClose = () => {}

    const handleCrop = () => {}

    const handleFilesChange = () => {}

    const handleMouseDown = () => {}

    const handleMouseMove = () => {}

    const handleMouseUp = () => {}

    const handleMovePortal = () => {}

    const handleResizePortal = () => {}

    const handleSubmit = () => {}

    return {
        open: () => {},
    }
}

try {
    if (module) {
        module.exports = HqCropper
    }
} catch (error) {
    // @ts-ignore
    window.HqCropper = HqCropper
}
