import { setClassNames } from '../style'
import type { ApplicationState } from '../types'

import mountBodyNode from './mountBodyNode'
import mountFooterNode from './mountFooterNode'
import mountHeaderNode from './mountHeaderNode'

const mountContainerNode = (
    getState: () => ApplicationState,
    onSubmit: (event: Event) => void,
    onClose: (event: Event) => void
): Element => {
    const state = getState()
    const element = document.createElement<'div'>('div')

    setClassNames(element, state.css?.container)

    element.appendChild(mountHeaderNode(getState))
    element.appendChild(mountBodyNode(getState))
    element.appendChild(mountFooterNode(getState, onSubmit, onClose))

    return element
}

export default mountContainerNode
