import { Action, EmittedPortalProps, IState } from '@src/types'
import handleMovePortal from '@src/handlers/handleMovePortal'
import handleResizePortal from '@src/handlers/handleResizePortal'

const registerMouseEvents = (
    getState: () => IState,
    setState: (value: Partial<IState>) => void
) => {
    const state = getState()
    const portalElement = document.querySelector<HTMLDivElement>(
        `.${state.css?.portal[0]}`
    )

    const portalAreaElement = document.querySelector<HTMLDivElement>(
        `.${state.css?.portalArea[0]}`
    )

    const rootElement = document.querySelector<HTMLDivElement>(
        `.${state.css?.root[0]}`
    )

    const handleMouseDown = (event) => {
        event.preventDefault()

        const { portal } = getState()

        const action = event.target.getAttribute('data-action')
            ? event.target.getAttribute('data-action')
            : event.target.parentNode.getAttribute('data-action')

        const emittedPortalProps: EmittedPortalProps = {
            X: event.pageX,
            Y: event.pageY,
            left: portal.left,
            top: portal.top,
        }

        setState({
            action,
            emittedPortalProps,
        })
    }

    const handleMouseUp = (event) => {
        event.preventDefault()

        setState({
            action: null,
        })
    }

    const handleMouseMove = (event) => {
        const { action } = getState()

        if (!action) {
            event.preventDefault()
            return
        }

        switch (action) {
            case Action.MOVE:
                handleMovePortal(event, getState, setState)
                break

            default:
                handleResizePortal(event, getState, setState)
        }
    }

    if (rootElement) {
        rootElement.addEventListener('mouseup', handleMouseUp)
    }

    if (portalElement) {
        portalElement.addEventListener('mousedown', handleMouseDown)
    }

    if (portalAreaElement) {
        portalAreaElement.addEventListener('mousemove', handleMouseMove)
    }
}

export default registerMouseEvents
