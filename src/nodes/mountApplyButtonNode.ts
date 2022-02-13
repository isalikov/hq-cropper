import { IState } from '@src/types'
import { setClassNames } from '@src/style'

const mountApplyButtonNode = (getState: () => IState): Element => {
    const state = getState()
    const applyButton = document.createElement<'button'>('button')
    setClassNames(applyButton, state.css.applyButton)

    applyButton.setAttribute('type', 'submit')
    applyButton.innerText = state.config.applyButtonLabel

    return applyButton
}

export default mountApplyButtonNode
