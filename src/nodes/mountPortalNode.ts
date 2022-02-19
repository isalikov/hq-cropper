import { IState } from '@src/types'
import { setClassNames } from '@src/style'

import mountHandlerMoveNode from '@src/nodes/mountHandlerMoveNode'
import mountHandlerResizeTopLeft from '@src/nodes/mountHandlerResizeTopLeft'
import mountHandlerResizeTopRight from '@src/nodes/mountHandlerResizeTopRight'
import mountHandlerResizeBottomLeft from '@src/nodes/mountHandlerResizeBottomLeft'
import mountHandlerResizeBottomRight from '@src/nodes/mountHandlerResizeBottomRight'

const mountPortalNode = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'div'>('div')
    setClassNames(element, state.css?.portal)

    element.appendChild(mountHandlerMoveNode(getState))
    element.appendChild(mountHandlerResizeTopLeft(getState))
    element.appendChild(mountHandlerResizeTopRight(getState))
    element.appendChild(mountHandlerResizeBottomLeft(getState))
    element.appendChild(mountHandlerResizeBottomRight(getState))

    return element
}

export default mountPortalNode
