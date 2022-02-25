import { Action, IState } from '../types'

const handleResizePortal = (
    event: MouseEvent,
    getState: () => IState,
    setState: (value: Partial<IState>) => void
): void => {
    const { action, emitted, portal, frame, config } = getState()

    const shiftX = event.pageX - emitted.X
    const shiftY = event.pageY - emitted.Y

    switch (action) {
        case Action.RESIZE_BR: {
            let size = emitted.size + Math.max(shiftX, shiftY)

            if (emitted.top + size > frame.height - config.framePadding) {
                size = frame.height - emitted.top - config.framePadding
            }

            if (emitted.left + size > frame.width - config.framePadding) {
                size = frame.width - emitted.left - config.framePadding
            }

            return setState({
                portal: {
                    ...portal,
                    size,
                },
            })
        }

        case Action.RESIZE_TR: {
            let size =
                shiftX + shiftY > 0
                    ? emitted.size + shiftX
                    : emitted.size - shiftY

            let top =
                shiftX + shiftY > 0
                    ? emitted.top - shiftX
                    : emitted.top + shiftY

            if (emitted.left + size > frame.width - config.framePadding) {
                size = frame.width - emitted.left - config.framePadding
                top = emitted.top - frame.width + emitted.left + emitted.size
            }

            if (top < config.framePadding) {
                size = emitted.top + emitted.size
                top = config.framePadding
            }

            return setState({
                portal: {
                    ...portal,
                    top,
                    size,
                },
            })
        }

        case Action.RESIZE_TL: {
            let size =
                shiftX - shiftY < 0
                    ? emitted.size - shiftX
                    : emitted.size - shiftY

            let left =
                shiftX - shiftY < 0
                    ? emitted.left + shiftX
                    : emitted.left + shiftY

            let top =
                shiftX - shiftY < 0
                    ? emitted.top + shiftX
                    : emitted.top + shiftY

            if (top < config.framePadding) {
                left = emitted.left - emitted.top
                size = emitted.top + emitted.size
                top = config.framePadding
            }

            if (left < config.framePadding) {
                left = config.framePadding
                size = emitted.left + emitted.size - config.framePadding
                top = emitted.top - emitted.left
            }

            return setState({
                portal: {
                    ...portal,
                    top,
                    left,
                    size,
                },
            })
        }

        case Action.RESIZE_BL: {
            let size =
                shiftX + shiftY > 0
                    ? emitted.size + shiftY
                    : emitted.size - shiftX

            let left =
                shiftX + shiftY > 0
                    ? emitted.left - shiftY
                    : emitted.left + shiftX

            if (size + emitted.top > frame.height - config.framePadding) {
                left = emitted.left - frame.height + emitted.top + emitted.size
                size = frame.height - emitted.top - config.framePadding
            }

            if (left < config.framePadding) {
                left = config.framePadding
                size = emitted.left + emitted.size - config.framePadding
            }

            return setState({
                portal: {
                    ...portal,
                    left,
                    size,
                },
            })
        }

        default:
            return undefined
    }
}

export default handleResizePortal
