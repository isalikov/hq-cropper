import { FrameProps, IState } from '@src/types'

const getFrameProps = (
    getState: () => IState,
    image: HTMLImageElement
): FrameProps => {
    const state = getState()

    const body = document.querySelector<HTMLDivElement>(
        `.${state.css?.body[0]}`
    )

    if (!body) {
        return state.frame
    }

    const { width: bodyWidth, height: bodyHeight } =
        body.getBoundingClientRect()

    const bodyAspectRatio = bodyWidth / bodyHeight
    const imageAspectRation = image.width / image.height

    let width: number
    let height: number
    let top = 0
    let left = 0

    if (bodyAspectRatio > imageAspectRation) {
        width = bodyHeight * imageAspectRation
        height = bodyHeight
        left = (bodyWidth - width) / 2
    } else {
        width = bodyWidth
        height = bodyWidth * (image.height / image.width)
        top = (bodyHeight - height) / 2
    }

    return {
        width,
        height,
        left,
        top,
    }
}

export default getFrameProps
