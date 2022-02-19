import { IState } from '@src/types'
import { setClassNames } from '@src/style'

const mountHeaderNode = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'div'>('div')

    setClassNames(element, state.css?.header)

    return element
}

export default mountHeaderNode
