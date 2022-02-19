import { IState } from '@src/types'
import { setClassNames } from '@src/style'

import mountPortalNode from './mountPortalNode'

const mountPortalAreaNode = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'div'>('div')
    setClassNames(element, state.css?.portalArea)

    element.appendChild(mountPortalNode(getState))

    return element
}

export default mountPortalAreaNode
