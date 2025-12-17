import { setClassNames } from '../style'
import type { ApplicationState } from '../types'

const mountPreviewImageNode = (getState: () => ApplicationState): Element => {
    const state = getState()
    const element = document.createElement<'img'>('img')
    setClassNames(element, state.css?.previewImage)

    return element
}

export default mountPreviewImageNode
