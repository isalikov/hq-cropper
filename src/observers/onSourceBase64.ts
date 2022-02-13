import { IState } from '@src/types'

const onSourceBase64 = (value: string, state: IState) => {
    const sourceImage = document.querySelector<HTMLImageElement>(
        `.${state.css.sourceImage[0]}`
    )

    if (sourceImage) {
        sourceImage.setAttribute('src', value)

        sourceImage.style.maxHeight = `${state.frameHeight}px`
        sourceImage.style.maxWidth = `${state.frameWidth}px`

        if (state.sourceWidth > state.sourceHeight) {
            sourceImage.style.width = '100%'
        }

        if (state.sourceWidth < state.sourceHeight) {
            sourceImage.style.height = '100%'
        }

        if (state.sourceWidth === state.sourceHeight) {
            sourceImage.style.width = '100%'
            sourceImage.style.height = '100%'
        }
    }
}

export default onSourceBase64
