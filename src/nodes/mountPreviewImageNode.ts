import { setClassNames } from '../style'
import { IState } from '../types'

const mountPreviewImageNode = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'img'>('img')
    setClassNames(element, state.css?.previewImage)

    return element
}

export default mountPreviewImageNode
