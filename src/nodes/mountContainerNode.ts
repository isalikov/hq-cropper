import { IState } from '@src/types'
import { setClassNames } from '@src/style'

import mountBodyNode from './mountBodyNode'
import mountFooterNode from './mountFooterNode'

const mountContainerNode = (
    getState: () => IState,
    onSubmit: (event: Event) => void,
    onClose: (event: Event) => void
): Element => {
    const state = getState()
    const container = document.createElement<'form'>('form')
    container.addEventListener('submit', onSubmit)

    setClassNames(container, state.css.container)

    container.appendChild(mountBodyNode(getState))
    container.appendChild(mountFooterNode(getState, onClose))

    return container
}

export default mountContainerNode
