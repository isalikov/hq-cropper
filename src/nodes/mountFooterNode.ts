import { setClassNames } from '../style'
import { IState } from '../types'

import mountApplyButtonNode from './mountApplyButtonNode'
import mountCancelButtonNode from './mountCancelButtonNode'

const mountFooterNode = (
    getState: () => IState,
    onSubmit: (event: Event) => void,
    onClose: (event: Event) => void
): Element => {
    const state = getState()
    const element = document.createElement<'div'>('div')
    setClassNames(element, state.css?.footer)

    element.appendChild(mountCancelButtonNode(getState, onClose))
    element.appendChild(mountApplyButtonNode(getState, onSubmit))

    return element
}

export default mountFooterNode
