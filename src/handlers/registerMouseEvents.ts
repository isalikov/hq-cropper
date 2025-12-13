import type { EmittedPortalProps, IState } from '../types'
import { Action } from '../types'

import handleMovePortal from './handleMovePortal'
import handleResizePortal from './handleResizePortal'

const registerMouseEvents = (
    getState: () => IState,
    setState: (value: Partial<IState>) => void
): (() => void) => {
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

    let animationFrameId: number | null = null
    let pendingEvent: MouseEvent | null = null

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

        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId)
            animationFrameId = null
        }
        pendingEvent = null

        setState({
            action: null,
        })
    }

    const processMouseMove = () => {
        animationFrameId = null

        if (!pendingEvent) {
            return
        }

        const event = pendingEvent
        pendingEvent = null

        const { action } = getState()

        if (!action) {
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

    const handleMouseMove = (event: MouseEvent) => {
        const { action } = getState()

        if (!action) {
            event.preventDefault()
            return
        }

        pendingEvent = event

        if (animationFrameId === null) {
            animationFrameId = requestAnimationFrame(processMouseMove)
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

    return () => {
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId)
        }
        if (rootElement) {
            rootElement.removeEventListener('mouseup', handleMouseUp)
        }
        if (portalElement) {
            portalElement.removeEventListener('mousedown', handleMouseDown)
        }
        if (portalAreaElement) {
            portalAreaElement.removeEventListener('mousemove', handleMouseMove)
        }
    }
}

export default registerMouseEvents
