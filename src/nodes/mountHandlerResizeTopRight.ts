import { Action, IState } from '@src/types'
import { setClassNames } from '@src/style'

const mountHandlerResizeTopRight = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'span'>('span')
    setClassNames(element, state.css?.handlerResizeTopRight)

    element.setAttribute('data-action', Action.RESIZE_TR)

    return element
}

export default mountHandlerResizeTopRight
