import { IState } from '@src/types'
import { setClassNames } from '@src/style'

import mountContainerNode from './mountContainerNode'

const mountRootNode = (
    getState: () => IState,
    onSubmit: (event: Event) => void,
    onClose: (event: Event) => void
): void => {
    const state = getState()
    const root = document.createElement<'div'>('div')
    setClassNames(root, state.css.root)

    root.appendChild(mountContainerNode(getState, onSubmit, onClose))

    document.body.appendChild(root)
}

export default mountRootNode
