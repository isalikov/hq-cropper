import { IState } from '@src/types'
import { setClassNames } from '@src/style'

const mountHeaderNode = (getState: () => IState): Element => {
    const state = getState()
    const header = document.createElement<'div'>('div')

    setClassNames(header, state.css.header)

    return header
}

export default mountHeaderNode
