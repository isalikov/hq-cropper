import { setClassNames } from '../style'
import { IState } from '../types'

import mountPortalNode from './mountPortalNode'

const mountPortalAreaNode = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'div'>('div')
    setClassNames(element, state.css?.portalArea)

    element.appendChild(mountPortalNode(getState))

    return element
}

export default mountPortalAreaNode
