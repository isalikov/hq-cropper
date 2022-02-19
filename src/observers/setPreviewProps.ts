import { IState, PortalProps } from '@src/types'

const setPreviewProps = (portal: PortalProps, state: IState) => {
    const previewImage = document.querySelector<HTMLImageElement>(
        `.${state.css?.previewImage[0]}`
    )

    if (previewImage) {
        previewImage.style.marginLeft = `-${state.portal.left}px`
        previewImage.style.marginTop = `-${state.portal.top}px`
    }
}

export default setPreviewProps
