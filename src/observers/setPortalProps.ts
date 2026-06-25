import type { ApplicationState, PortalProps } from '../types'
import { getElement } from './domCache'

const setPortalProps = (portal: PortalProps, state: ApplicationState) => {
    const portalElement = getElement('portal', state.css)

    if (portalElement) {
        portalElement.style.left = `${portal.left}px`
        portalElement.style.top = `${portal.top}px`
        portalElement.style.width = `${portal.width}px`
        portalElement.style.height = `${portal.height}px`
    }

    const previewImage = getElement('previewImage', state.css)

    if (previewImage) {
        previewImage.style.marginLeft = `-${portal.left}px`
        previewImage.style.marginTop = `-${portal.top}px`
    }
}

export default setPortalProps
