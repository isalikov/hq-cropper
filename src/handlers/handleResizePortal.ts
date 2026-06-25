import type {
    ApplicationState,
    ConfigurationOptions,
    EmittedPortalProps,
    FrameProps,
    PointerCoordinates,
    PortalProps,
} from '../types'
import { Action } from '../types'

const clamp = (value: number, min: number, max: number): number =>
    Math.min(Math.max(value, min), max)

/**
 * Square (1:1) resize. Both sides move together by a single delta so the portal
 * stays a perfect square. Preserves the original locked-aspect behaviour.
 */
const resizeSquare = (
    action: Action,
    emitted: EmittedPortalProps,
    frame: FrameProps,
    config: ConfigurationOptions,
    shiftX: number,
    shiftY: number
): Partial<PortalProps> => {
    const pad = config.framePadding
    const min = config.minPortalSize
    // In locked mode width === height, so either edge is the square's size.
    const base = emitted.width

    switch (action) {
        case Action.RESIZE_BR: {
            let size = base + Math.max(shiftX, shiftY)

            if (size < min) {
                size = min
            }

            if (emitted.top + size > frame.height - pad) {
                size = frame.height - emitted.top - pad
            }

            if (emitted.left + size > frame.width - pad) {
                size = frame.width - emitted.left - pad
            }

            return { width: size, height: size }
        }

        case Action.RESIZE_TR: {
            let size = shiftX + shiftY > 0 ? base + shiftX : base - shiftY
            let top =
                shiftX + shiftY > 0
                    ? emitted.top - shiftX
                    : emitted.top + shiftY

            if (size < min) {
                top = emitted.top + base - min
                size = min
            }

            if (emitted.left + size > frame.width - pad) {
                size = frame.width - emitted.left - pad
                top = emitted.top - frame.width + emitted.left + base
            }

            if (top < pad) {
                size = emitted.top + base
                top = pad
            }

            return { top, width: size, height: size }
        }

        case Action.RESIZE_TL: {
            const minShift = Math.min(shiftX, shiftY)

            let size = base - minShift
            let left = emitted.left + minShift
            let top = emitted.top + minShift

            if (size < min) {
                const diff = base - min
                size = min
                left = emitted.left + diff
                top = emitted.top + diff
            }

            if (top < pad) {
                const overflow = pad - top
                top = pad
                left = left + overflow
                size = size - overflow
            }

            if (left < pad) {
                const overflow = pad - left
                left = pad
                top = top + overflow
                size = size - overflow
            }

            return { top, left, width: size, height: size }
        }

        case Action.RESIZE_BL: {
            let size = shiftX + shiftY > 0 ? base + shiftY : base - shiftX
            let left =
                shiftX + shiftY > 0
                    ? emitted.left - shiftY
                    : emitted.left + shiftX

            if (size < min) {
                left = emitted.left + base - min
                size = min
            }

            if (size + emitted.top > frame.height - pad) {
                left = emitted.left - frame.height + emitted.top + base
                size = frame.height - emitted.top - pad
            }

            if (left < pad) {
                left = pad
                size = emitted.left + base - pad
            }

            return { left, width: size, height: size }
        }

        default:
            return {}
    }
}

/**
 * Free rectangle resize. Width and height move independently; the corner
 * opposite the dragged handle stays anchored.
 */
const resizeFree = (
    action: Action,
    emitted: EmittedPortalProps,
    frame: FrameProps,
    config: ConfigurationOptions,
    shiftX: number,
    shiftY: number
): Partial<PortalProps> => {
    const pad = config.framePadding
    const min = config.minPortalSize
    const right = emitted.left + emitted.width
    const bottom = emitted.top + emitted.height

    switch (action) {
        case Action.RESIZE_BR: {
            // Anchor: top-left corner.
            const width = clamp(
                emitted.width + shiftX,
                min,
                frame.width - pad - emitted.left
            )
            const height = clamp(
                emitted.height + shiftY,
                min,
                frame.height - pad - emitted.top
            )

            return { width, height }
        }

        case Action.RESIZE_TR: {
            // Anchor: bottom-left corner.
            const width = clamp(
                emitted.width + shiftX,
                min,
                frame.width - pad - emitted.left
            )
            const top = clamp(emitted.top + shiftY, pad, bottom - min)
            const height = bottom - top

            return { top, width, height }
        }

        case Action.RESIZE_TL: {
            // Anchor: bottom-right corner.
            const left = clamp(emitted.left + shiftX, pad, right - min)
            const top = clamp(emitted.top + shiftY, pad, bottom - min)

            return { left, top, width: right - left, height: bottom - top }
        }

        case Action.RESIZE_BL: {
            // Anchor: top-right corner.
            const left = clamp(emitted.left + shiftX, pad, right - min)
            const height = clamp(
                emitted.height + shiftY,
                min,
                frame.height - pad - emitted.top
            )

            return { left, width: right - left, height }
        }

        default:
            return {}
    }
}

const handleResizePortal = (
    coords: PointerCoordinates,
    getState: () => ApplicationState,
    setState: (value: Partial<ApplicationState>) => void
): void => {
    const { action, emitted, portal, frame, config } = getState()

    if (!action || action === Action.MOVE) {
        return
    }

    const shiftX = coords.pageX - emitted.X
    const shiftY = coords.pageY - emitted.Y

    const next = config.lockAspectRatio
        ? resizeSquare(action, emitted, frame, config, shiftX, shiftY)
        : resizeFree(action, emitted, frame, config, shiftX, shiftY)

    setState({
        portal: {
            ...portal,
            ...next,
        },
    })
}

export default handleResizePortal
