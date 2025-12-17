import { setClassNames } from '../style'
import type { ApplicationState } from '../types'

import mountContainerNode from './mountContainerNode'

const mountRootNode = (
    getState: () => ApplicationState,
    onSubmit: (event: Event) => void,
    onClose: (event: Event) => void
): void => {
    const state = getState()
    const element = document.createElement<'div'>('div')
    setClassNames(element, state.css?.root)

    element.appendChild(mountContainerNode(getState, onSubmit, onClose))

    document.body.appendChild(element)
}

export default mountRootNode
