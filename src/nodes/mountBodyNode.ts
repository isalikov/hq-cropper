import { setClassNames } from '../style'
import type { ApplicationState } from '../types'

import mountPortalAreaNode from './mountPortalAreaNode'
import mountSourceImageNode from './mountSourceImageNode'

const mountBodyNode = (getState: () => ApplicationState): Element => {
    const state = getState()
    const element = document.createElement<'div'>('div')
    setClassNames(element, state.css?.body)

    element.appendChild(mountSourceImageNode(getState))
    element.appendChild(mountPortalAreaNode(getState))

    return element
}

export default mountBodyNode
