import { Action, EmittedPortalProps, IState } from '../types'

import handleMovePortal from './handleMovePortal'
import handleResizePortal from './handleResizePortal'

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

    const handleMouseDown = (event: MouseEvent) => {
        event.preventDefault()

        const { portal } = getState()

        if (event.target) {
            const node = event.target as HTMLElement
            const action = node.getAttribute('data-action') as Action

            const emittedPortalProps: EmittedPortalProps = {
                X: event.pageX,
                Y: event.pageY,
                left: portal.left,
                top: portal.top,
                size: portal.size,
            }

            setState({
                action,
                emitted: emittedPortalProps,
            })
        }
    }

    const handleMouseUp = (event: MouseEvent) => {
        event.preventDefault()

        setState({
            action: null,
        })
    }

    const handleMouseMove = (event: MouseEvent) => {
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
