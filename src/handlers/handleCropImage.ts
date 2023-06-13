import { IState } from '../types'

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

    canvas
        ?.getContext('2d')
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

    canvas.remove()

    const base64 = Promise.resolve(
        canvas.toDataURL(state.config.type, state.config.compression)
    )

    const blob = new Promise<Blob | null>((resolve) => {
        canvas.toBlob(
            (value) => resolve(value),
            state.config.type,
            state.config.compression
        )
    })

    return Promise.all([base64, blob])
}

export default handleCropImage
