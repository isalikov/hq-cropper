import type { IState, PortalProps } from '../types'
import { getElement } from './domCache'

const setPortalProps = (portal: PortalProps, state: IState) => {
    const portalElement = getElement('portal', state.css)

    if (portalElement) {
        portalElement.style.left = `${portal.left}px`
        portalElement.style.top = `${portal.top}px`
        portalElement.style.width = `${portal.size}px`
        portalElement.style.height = `${portal.size}px`
    }
}

export default setPortalProps
