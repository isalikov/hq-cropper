import type { IState, PortalProps } from '../types'
import { getElement } from './domCache'

const setPreviewProps = (_portal: PortalProps, state: IState) => {
    const previewImage = getElement('previewImage', state.css)

    if (previewImage) {
        previewImage.style.marginLeft = `-${state.portal.left}px`
        previewImage.style.marginTop = `-${state.portal.top}px`
    }
}

export default setPreviewProps
