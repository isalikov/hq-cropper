import type { ApplicationState, PointerCoordinates } from '../types'
import { Action } from '../types'

const handleResizePortal = (
    coords: PointerCoordinates,
    getState: () => ApplicationState,
    setState: (value: Partial<ApplicationState>) => void
): void => {
    const { action, emitted, portal, frame, config } = getState()

    const shiftX = coords.pageX - emitted.X
    const shiftY = coords.pageY - emitted.Y

    switch (action) {
        case Action.RESIZE_BR: {
            let size = emitted.size + Math.max(shiftX, shiftY)

            if (size < config.minPortalSize) {
                size = config.minPortalSize
            }

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

            if (size < config.minPortalSize) {
                top = emitted.top + emitted.size - config.minPortalSize
                size = config.minPortalSize
            }

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
            const minShift = Math.min(shiftX, shiftY)

            let size = emitted.size - minShift
            let left = emitted.left + minShift
            let top = emitted.top + minShift

            if (size < config.minPortalSize) {
                const diff = emitted.size - config.minPortalSize
                size = config.minPortalSize
                left = emitted.left + diff
                top = emitted.top + diff
            }

            if (top < config.framePadding) {
                const overflow = config.framePadding - top
                top = config.framePadding
                left = left + overflow
                size = size - overflow
            }

            if (left < config.framePadding) {
                const overflow = config.framePadding - left
                left = config.framePadding
                top = top + overflow
                size = size - overflow
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

            if (size < config.minPortalSize) {
                left = emitted.left + emitted.size - config.minPortalSize
                size = config.minPortalSize
            }

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
