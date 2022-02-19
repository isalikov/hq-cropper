import { IState } from '@src/types'

const handleMovePortal = (
    event: MouseEvent,
    getState: () => IState,
    setState: (value: Partial<IState>) => void
): void => {
    const { emittedPortalProps, portal, frame } = getState()

    let left = emittedPortalProps.left - emittedPortalProps.X + event.clientX
    let top = emittedPortalProps.top - emittedPortalProps.Y + event.clientY

    const MinLeftValue = 3
    const MaxLeftValue = frame.width - 3 - portal.size
    const MinTopValue = 3
    const MaxTopValue = frame.height - 3 - portal.size

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
