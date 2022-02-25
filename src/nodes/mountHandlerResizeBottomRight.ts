import { Action, IState } from '../types'
import { setClassNames } from '../style'

const mountHandlerResizeBottomRight = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'span'>('span')
    setClassNames(element, state.css?.handlerResizeBottomRight)

    element.setAttribute('data-action', Action.RESIZE_BR)

    return element
}

export default mountHandlerResizeBottomRight
