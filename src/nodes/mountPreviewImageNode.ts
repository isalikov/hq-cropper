import { IState } from '@src/types'
import { setClassNames } from '@src/style'

const mountPreviewImageNode = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'img'>('img')
    setClassNames(element, state.css?.previewImage)

    return element
}

export default mountPreviewImageNode
