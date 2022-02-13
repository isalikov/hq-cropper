import { IState } from '@src/types'
import { setClassNames } from '@src/style'

const mountBodyNode = (getState: () => IState): Element => {
    const state = getState()
    const body = document.createElement<'div'>('div')
    setClassNames(body, state.css.body)

    return body
}

export default mountBodyNode
