import { IState } from '../types'

const handleMovePortal = (
    event: MouseEvent,
    getState: () => IState,
    setState: (value: Partial<IState>) => void
): void => {
    const { emitted, portal, frame, config } = getState()

    let left = emitted.left - emitted.X + event.clientX
    let top = emitted.top - emitted.Y + event.clientY

    const MinLeftValue = config.framePadding
    const MaxLeftValue = frame.width - config.framePadding - portal.size
    const MinTopValue = config.framePadding
    const MaxTopValue = frame.height - config.framePadding - portal.size

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
