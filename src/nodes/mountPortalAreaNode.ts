import { IState } from '@src/types'
import { setClassNames } from '@src/style'

const mountPortalAreaNode = (getState: () => IState): Element => {
    const state = getState()
    const portalArea = document.createElement<'div'>('div')
    setClassNames(portalArea, state.css?.portalArea)

    return portalArea
}

export default mountPortalAreaNode
