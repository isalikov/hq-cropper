import { IState } from '@src/types'
import { setClassNames } from '@src/style'

const mountCancelButtonNode = (
    getState: () => IState,
    onClose: (event: Event) => void
): Element => {
    const state = getState()
    const cancelButton = document.createElement<'div'>('div')
    setClassNames(cancelButton, state.css.cancelButton)

    cancelButton.setAttribute('role', 'button')
    cancelButton.innerText = state.config.cancelButtonLabel
    cancelButton.addEventListener('click', onClose)

    return cancelButton
}

export default mountCancelButtonNode
