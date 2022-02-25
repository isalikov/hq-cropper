import { setClassNames } from '../style'
import { IState } from '../types'

import mountPreviewImageNode from './mountPreviewImageNode'

const mountPreviewNode = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'div'>('div')
    setClassNames(element, state.css?.preview)

    element.appendChild(mountPreviewImageNode(getState))

    return element
}

export default mountPreviewNode
