import { IState } from '@src/types'
import { setClassNames } from '@src/style'

import mountPortalAreaNode from '@src/nodes/mountPortalAreaNode'
import mountSourceImageNode from './mountSourceImageNode'

const mountBodyNode = (getState: () => IState): Element => {
    const state = getState()
    const body = document.createElement<'div'>('div')
    setClassNames(body, state.css?.body)

    body.appendChild(mountSourceImageNode(getState))
    body.appendChild(mountPortalAreaNode(getState))

    return body
}

export default mountBodyNode
