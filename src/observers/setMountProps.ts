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
}

export default setMountProps
