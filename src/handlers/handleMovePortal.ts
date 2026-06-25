import type { ApplicationState, PointerCoordinates } from '../types'

const handleMovePortal = (
    coords: PointerCoordinates,
    getState: () => ApplicationState,
    setState: (value: Partial<ApplicationState>) => void
): void => {
    const { emitted, portal, frame, config } = getState()

    // `emitted.X`/`emitted.Y` are captured from pageX/pageY on pointer-down, so
    // the live delta must use pageX/pageY too — mixing in clientX/clientY shifts
    // the portal by the scroll offset (it snaps to the frame edge on the axis
    // that's scrolled). Matches handleResizePortal, which is page-based already.
    let left = emitted.left - emitted.X + coords.pageX
    let top = emitted.top - emitted.Y + coords.pageY

    const MinLeftValue = config.framePadding
    const MaxLeftValue = frame.width - config.framePadding - portal.width
    const MinTopValue = config.framePadding
    const MaxTopValue = frame.height - config.framePadding - portal.height

    if (left < MinLeftValue) {
        left = MinLeftValue
    }

    if (left > MaxLeftValue) {
        left = MaxLeftValue
    }

    if (top < MinTopValue) {
        top = MinTopValue
    }

    if (top > MaxTopValue) {
        top = MaxTopValue
    }

    setState({
        portal: {
            ...portal,
            left,
            top,
        },
    })
}

export default handleMovePortal
