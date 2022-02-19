import { IState } from '@src/types'
import { setClassNames } from '@src/style'

const mountSourceImageNode = (getState: () => IState): Element => {
    const state = getState()
    const sourceImage = document.createElement<'img'>('img')
    setClassNames(sourceImage, state.css?.sourceImage)

    sourceImage.setAttribute('alt', 'source')
    sourceImage.setAttribute('crossOrigin', 'anonymous')
    sourceImage.setAttribute('draggable', 'false')
    sourceImage.setAttribute('src', state.sourceBase64)

    return sourceImage
}

export default mountSourceImageNode
