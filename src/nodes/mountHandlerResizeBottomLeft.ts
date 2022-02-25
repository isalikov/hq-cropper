import { Action, IState } from '../types'
import { setClassNames } from '../style'

const mountHandlerResizeBottomLeft = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'span'>('span')
    setClassNames(element, state.css?.handlerResizeBottomLeft)

    element.setAttribute('data-action', Action.RESIZE_BL)

    return element
}

export default mountHandlerResizeBottomLeft
