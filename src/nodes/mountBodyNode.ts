import { IState } from '@src/types'
import { setClassNames } from '@src/style'

import mountSourceImageNode from './mountSourceImageNode'

const mountBodyNode = (getState: () => IState): Element => {
    const state = getState()
    const body = document.createElement<'div'>('div')
    setClassNames(body, state.css.body)

    body.appendChild(mountSourceImageNode(getState))

    return body
}

export default mountBodyNode
