import { setClassNames } from '../style'
import type { ApplicationState } from '../types'

const mountHeaderNode = (getState: () => ApplicationState): Element => {
    const state = getState()
    const element = document.createElement<'div'>('div')

    setClassNames(element, state.css?.header)

    return element
}

export default mountHeaderNode
