import type { ApplicationState } from '../types'

const MIN_SIZE = 1

const handleCropImage = (
    getState: () => ApplicationState
): Promise<[string, Blob | null]> => {
    const state = getState()
    const canvas = document.createElement('canvas')

    const frameWidth = state.frame.width || MIN_SIZE
    const frameHeight = state.frame.height || MIN_SIZE

    const scaleX = state.sourceWidth / frameWidth
    const scaleY = state.sourceHeight / frameHeight

    const sx = state.portal.left * scaleX
    const sy = state.portal.top * scaleY

    const sourceWidth = Math.max(state.portal.width * scaleX, MIN_SIZE)
    const sourceHeight = Math.max(state.portal.height * scaleY, MIN_SIZE)

    // `outputSize` constrains the longest side; the other side scales
    // proportionally so the cropped aspect ratio is preserved. For square
    // crops both sides are equal, yielding an `outputSize` × `outputSize` image.
    let outputWidth = sourceWidth
    let outputHeight = sourceHeight

    if (state.config.outputSize > 0) {
        const ratio =
            state.config.outputSize / Math.max(sourceWidth, sourceHeight)
        outputWidth = sourceWidth * ratio
        outputHeight = sourceHeight * ratio
    }

    canvas.width = outputWidth
    canvas.height = outputHeight

    const sourceImage = document.querySelector<HTMLImageElement>(
        `.${state.css?.sourceImage[0]}`
    )

    if (sourceImage) {
        canvas
            .getContext('2d')
            ?.drawImage(
                sourceImage,
                sx,
                sy,
                sourceWidth,
                sourceHeight,
                0,
                0,
                outputWidth,
                outputHeight
            )
    }

    const base64 = canvas.toDataURL(
        `image/${state.config.type}`,
        state.config.compression
    )

    return new Promise<[string, Blob | null]>((resolve, reject) => {
        try {
            canvas.toBlob(
                (blob) => {
                    canvas.remove()
                    if (!blob) {
                        reject(
                            new Error(
                                `Failed to create blob for type: image/${state.config.type}`
                            )
                        )
                        return
                    }
                    resolve([base64, blob])
                },
                `image/${state.config.type}`,
                state.config.compression
            )
        } catch (error) {
            canvas.remove()
            reject(error)
        }
    })
}

export default handleCropImage
