import type { ApplicationState } from '../types'
import { getElement } from './domCache'

const setMountProps = (value: string, state: ApplicationState) => {
    const sourceImage = getElement('sourceImage', state.css)

    if (sourceImage) {
        sourceImage.setAttribute('src', value)

        sourceImage.style.height = `${state.frame.height}px`
        sourceImage.style.width = `${state.frame.width}px`
        sourceImage.style.left = `${state.frame.left}px`
        sourceImage.style.top = `${state.frame.top}px`
    }

    const portalArea = getElement('portalArea', state.css)

    if (portalArea) {
        portalArea.style.height = `${state.frame.height}px`
        portalArea.style.width = `${state.frame.width}px`
        portalArea.style.left = `${state.frame.left}px`
        portalArea.style.top = `${state.frame.top}px`
    }

    const portal = getElement('portal', state.css)

    if (portal) {
        portal.style.width = `${state.portal.width}px`
        portal.style.height = `${state.portal.height}px`
        portal.style.left = `${state.portal.left}px`
        portal.style.top = `${state.portal.top}px`
    }

    const previewImage = getElement('previewImage', state.css)

    if (previewImage) {
        previewImage.setAttribute('src', value)

        previewImage.style.height = `${state.frame.height}px`
        previewImage.style.width = `${state.frame.width}px`
        previewImage.style.marginLeft = `-${state.portal.left}px`
        previewImage.style.marginTop = `-${state.portal.top}px`
    }
}

export default setMountProps
