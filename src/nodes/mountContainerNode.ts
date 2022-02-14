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
    const container = document.createElement<'div'>('div')

    setClassNames(container, state.css.container)

    container.appendChild(mountHeaderNode(getState))
    container.appendChild(mountBodyNode(getState))
    container.appendChild(mountFooterNode(getState, onSubmit, onClose))

    return container
}

export default mountContainerNode
