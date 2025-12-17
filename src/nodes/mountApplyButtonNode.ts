import { setClassNames } from '../style'
import type { ApplicationState } from '../types'

const mountApplyButtonNode = (
    getState: () => ApplicationState,
    onSubmit: (event: Event) => void
): Element => {
    const state = getState()
    const element = document.createElement<'div'>('div')
    setClassNames(element, state.css?.applyButton)

    element.setAttribute('role', 'button')
    element.innerText = state.config.applyButtonLabel
    element.addEventListener('click', onSubmit)

    return element
}

export default mountApplyButtonNode
