import { IState } from '@src/types'

const setMountProps = (value: string, state: IState) => {
    const sourceImage = document.querySelector<HTMLImageElement>(
        `.${state.css?.sourceImage[0]}`
    )

    if (sourceImage) {
        sourceImage.setAttribute('src', value)

        sourceImage.style.height = `${state.frame.height}px`
        sourceImage.style.width = `${state.frame.width}px`
        sourceImage.style.left = `${state.frame.left}px`
        sourceImage.style.top = `${state.frame.top}px`
    }

    const portalArea = document.querySelector<HTMLDivElement>(
        `.${state.css?.portalArea[0]}`
    )

    if (portalArea) {
        portalArea.style.height = `${state.frame.height}px`
        portalArea.style.width = `${state.frame.width}px`
        portalArea.style.left = `${state.frame.left}px`
        portalArea.style.top = `${state.frame.top}px`
    }

    const portal = document.querySelector<HTMLDivElement>(
        `.${state.css?.portal[0]}`
    )

    if (portal) {
        portal.style.width = `${state.portal.size}px`
        portal.style.height = `${state.portal.size}px`
        portal.style.left = `${state.portal.left}px`
        portal.style.top = `${state.portal.top}px`
    }

    const previewImage = document.querySelector<HTMLImageElement>(
        `.${state.css?.previewImage[0]}`
    )

    if (previewImage) {
        previewImage.setAttribute('src', value)

        previewImage.style.height = `${state.frame.height}px`
        previewImage.style.width = `${state.frame.width}px`
        previewImage.style.marginLeft = `-${state.portal.left}px`
        previewImage.style.marginTop = `-${state.portal.top}px`
    }
}

export default setMountProps
