import { PortalProps, IState, FrameProps } from '@src/types'

const getAbsolutePortalPosition = (
    size: number,
    initialPosition: [number, number],
    frame: FrameProps
): [number, number] => {
    const [initialLeft, initialTop] = initialPosition

    const left =
        initialLeft + size > frame.width
            ? (frame.width - size) / 2
            : initialLeft

    const top =
        initialTop + size > frame.height
            ? (frame.height - size) / 2
            : initialTop

    return [left, top]
}

const getPortalProps = (
    getState: () => IState,
    frame: FrameProps
): PortalProps => {
    const { config } = getState()

    const maxFrameSize = Math.min(frame.width, frame.height) - 3
    const size =
        config.portalSize > maxFrameSize ? maxFrameSize : config.portalSize

    if (
        Array.isArray(config.portalPosition) &&
        config.portalPosition.length === 2
    ) {
        const [left, top] = getAbsolutePortalPosition(
            size,
            config.portalPosition,
            frame
        )

        return {
            left,
            top,
            size,
        }
    }

    if (config.portalPosition === 'center') {
        return {
            size,
            left: (frame.width - size) / 2,
            top: (frame.height - size) / 2,
        }
    }

    return {
        left: 0,
        top: 0,
        size,
    }
}

export default getPortalProps
