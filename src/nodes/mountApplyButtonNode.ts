import { IState } from '@src/types'
import { setClassNames } from '@src/style'

const mountApplyButtonNode = (
    getState: () => IState,
    onSubmit: (event: Event) => void
): Element => {
    const state = getState()
    const applyButton = document.createElement<'div'>('div')
    setClassNames(applyButton, state.css?.applyButton)

    applyButton.setAttribute('role', 'button')
    applyButton.innerText = state.config.applyButtonLabel
    applyButton.addEventListener('click', onSubmit)

    return applyButton
}

export default mountApplyButtonNode
