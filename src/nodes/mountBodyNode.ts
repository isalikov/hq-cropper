import { setClassNames } from '../style'
import { IState } from '../types'

import mountPortalAreaNode from './mountPortalAreaNode'
import mountSourceImageNode from './mountSourceImageNode'

const mountBodyNode = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'div'>('div')
    setClassNames(element, state.css?.body)

    element.appendChild(mountSourceImageNode(getState))
    element.appendChild(mountPortalAreaNode(getState))

    return element
}

export default mountBodyNode
