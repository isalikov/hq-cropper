import { IState } from '@src/types'
import { setClassNames } from '@src/style'

import mountApplyButtonNode from './mountApplyButtonNode'
import mountCancelButtonNode from './mountCancelButtonNode'

const mountFooterNode = (
    getState: () => IState,
    onClose: (event: Event) => void
): Element => {
    const state = getState()
    const footer = document.createElement<'div'>('div')
    setClassNames(footer, state.css.footer)

    footer.appendChild(mountCancelButtonNode(getState, onClose))
    footer.appendChild(mountApplyButtonNode(getState))

    return footer
}

export default mountFooterNode