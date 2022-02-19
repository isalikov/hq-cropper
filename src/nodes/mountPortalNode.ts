import { IState } from '@src/types'
import { setClassNames } from '@src/style'

import mountHandlerMoveNode from '@src/nodes/mountHandlerMoveNode'

const mountPortalNode = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'div'>('div')
    setClassNames(element, state.css?.portal)

    element.appendChild(mountHandlerMoveNode(getState))

    return element
}

export default mountPortalNode
