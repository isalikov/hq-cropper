import { setClassNames } from '../style'
import type { ApplicationState } from '../types'
import { Action } from '../types'

const mountHandlerMoveNode = (getState: () => ApplicationState): Element => {
    const state = getState()
    const element = document.createElement<'span'>('span')
    setClassNames(element, state.css?.handlerMove)

    element.setAttribute('data-action', Action.MOVE)

    return element
}

export default mountHandlerMoveNode
