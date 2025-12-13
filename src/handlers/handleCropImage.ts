import type { IState } from '../types'

const handleCropImage = (
    getState: () => IState
): Promise<[string, Blob | null]> => {
    const state = getState()
    const canvas = document.createElement('canvas')

    const scaleX = state.sourceWidth / state.frame.width
    const scaleY = state.sourceHeight / state.frame.height

    const sx = state.portal.left * scaleX
    const sy = state.portal.top * scaleY

    const dxSize = state.portal.size * Math.min(scaleX, scaleY)
    const baseSize = Math.log(dxSize) / Math.log(state.config.quality)

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
