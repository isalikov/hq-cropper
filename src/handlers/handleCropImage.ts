import type { IState } from '../types'

const MIN_QUALITY = 1.001
const MIN_SIZE = 1

const handleCropImage = (
    getState: () => IState
): Promise<[string, Blob | null]> => {
    const state = getState()
    const canvas = document.createElement('canvas')

    const frameWidth = state.frame.width || MIN_SIZE
    const frameHeight = state.frame.height || MIN_SIZE

    const scaleX = state.sourceWidth / frameWidth
    const scaleY = state.sourceHeight / frameHeight

    const sx = state.portal.left * scaleX
    const sy = state.portal.top * scaleY

    const dxSize = Math.max(
        state.portal.size * Math.min(scaleX, scaleY),
        MIN_SIZE
    )
    const quality = Math.max(state.config.quality, MIN_QUALITY)
    const baseSize = Math.max(Math.log(dxSize) / Math.log(quality), MIN_SIZE)

    canvas.width = baseSize
    canvas.height = baseSize

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
                dxSize,
                dxSize,
                0,
                0,
                baseSize,
                baseSize
            )
    }

    const base64 = canvas.toDataURL(
        `image/${state.config.type}`,
        state.config.compression
    )

    return new Promise<[string, Blob | null]>((resolve) => {
        canvas.toBlob(
            (blob) => {
                canvas.remove()
                resolve([base64, blob])
            },
            `image/${state.config.type}`,
            state.config.compression
        )
    })
}

export default handleCropImage
