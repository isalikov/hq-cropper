import { setClassNames } from '../style'
import type { ApplicationState } from '../types'

import mountPortalNode from './mountPortalNode'

const mountPortalAreaNode = (getState: () => ApplicationState): Element => {
    const state = getState()
    const element = document.createElement<'div'>('div')
    setClassNames(element, state.css?.portalArea)

    element.appendChild(mountPortalNode(getState))

    return element
}

export default mountPortalAreaNode
