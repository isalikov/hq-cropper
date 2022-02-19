import { IState, PortalProps } from '@src/types'

const setPortalProps = (portal: PortalProps, state: IState) => {
    const portalElement = document.querySelector<HTMLImageElement>(
        `.${state.css?.portal[0]}`
    )

    if (portalElement) {
        portalElement.style.left = `${portal.left}px`
        portalElement.style.top = `${portal.top}px`
    }
}

export default setPortalProps
