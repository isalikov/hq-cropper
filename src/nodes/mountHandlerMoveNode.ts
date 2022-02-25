import { setClassNames } from '../style'
import { Action, IState } from '../types'

const mountHandlerMoveNode = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'span'>('span')
    setClassNames(element, state.css?.handlerMove)

    element.setAttribute('data-action', Action.MOVE)

    return element
}

export default mountHandlerMoveNode
