import type { ApplicationState } from '../types'
import { Action } from '../types'
import { setClassNames } from '../style'

const mountHandlerResizeTopRight = (
    getState: () => ApplicationState
): Element => {
    const state = getState()
    const element = document.createElement<'span'>('span')
    setClassNames(element, state.css?.handlerResizeTopRight)

    element.setAttribute('data-action', Action.RESIZE_TR)

    return element
}

export default mountHandlerResizeTopRight
