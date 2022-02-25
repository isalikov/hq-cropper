import { IState, PortalProps } from '../types'

const setPortalProps = (portal: PortalProps, state: IState) => {
    const portalElement = document.querySelector<HTMLImageElement>(
        `.${state.css?.portal[0]}`
    )

    if (portalElement) {
        portalElement.style.left = `${portal.left}px`
        portalElement.style.top = `${portal.top}px`
        portalElement.style.width = `${portal.size}px`
        portalElement.style.height = `${portal.size}px`
    }
}

export default setPortalProps
