import { Action, IState } from '@src/types'
import { setClassNames } from '@src/style'

const mountHandlerResizeBottomLeft = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'span'>('span')
    setClassNames(element, state.css?.handlerResizeBottomLeft)

    element.setAttribute('data-action', Action.RESIZE_BL)

    return element
}

export default mountHandlerResizeBottomLeft
