import type { ApplicationState } from '../types'
import { Action } from '../types'
import { setClassNames } from '../style'

const mountHandlerResizeBottomRight = (
    getState: () => ApplicationState
): Element => {
    const state = getState()
    const element = document.createElement<'span'>('span')
    setClassNames(element, state.css?.handlerResizeBottomRight)

    element.setAttribute('data-action', Action.RESIZE_BR)

    return element
}

export default mountHandlerResizeBottomRight
