import { IState } from '@src/types'
import { setClassNames } from '@src/style'

const mountCancelButtonNode = (
    getState: () => IState,
    onClose: (event: Event) => void
): Element => {
    const state = getState()
    const element = document.createElement<'div'>('div')
    setClassNames(element, state.css?.cancelButton)

    element.setAttribute('role', 'button')
    element.innerText = state.config.cancelButtonLabel
    element.addEventListener('click', onClose)

    return element
}

export default mountCancelButtonNode
