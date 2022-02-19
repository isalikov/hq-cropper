import { IState } from '@src/types'
import { setClassNames } from '@src/style'

import mountBodyNode from './mountBodyNode'
import mountFooterNode from './mountFooterNode'
import mountHeaderNode from './mountHeaderNode'

const mountContainerNode = (
    getState: () => IState,
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
