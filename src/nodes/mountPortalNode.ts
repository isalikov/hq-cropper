import { IState } from '@src/types'
import { setClassNames } from '@src/style'

import mountHandlerMoveNode from './mountHandlerMoveNode'
import mountHandlerResizeBottomLeft from './mountHandlerResizeBottomLeft'
import mountHandlerResizeBottomRight from './mountHandlerResizeBottomRight'
import mountHandlerResizeTopLeft from './mountHandlerResizeTopLeft'
import mountHandlerResizeTopRight from './mountHandlerResizeTopRight'
import mountPreviewNode from './mountPreviewNode'

const mountPortalNode = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'div'>('div')
    setClassNames(element, state.css?.portal)

    element.appendChild(mountPreviewNode(getState))
    element.appendChild(mountHandlerMoveNode(getState))
    element.appendChild(mountHandlerResizeTopLeft(getState))
    element.appendChild(mountHandlerResizeTopRight(getState))
    element.appendChild(mountHandlerResizeBottomLeft(getState))
    element.appendChild(mountHandlerResizeBottomRight(getState))

    return element
}

export default mountPortalNode
