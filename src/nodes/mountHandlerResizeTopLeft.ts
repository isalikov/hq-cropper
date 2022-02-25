import { Action, IState } from '../types'
import { setClassNames } from '../style'

const mountHandlerResizeTopLeft = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'span'>('span')
    setClassNames(element, state.css?.handlerResizeTopLeft)

    element.setAttribute('data-action', Action.RESIZE_TL)

    return element
}

export default mountHandlerResizeTopLeft
