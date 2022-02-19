import { IState } from '@src/types'
import { setClassNames } from '@src/style'

const mountHandlerMoveNode = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'span'>('span')
    setClassNames(element, state.css?.handlerMove)

    element.setAttribute('data-action', 'move')

    return element
}

export default mountHandlerMoveNode
