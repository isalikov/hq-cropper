import type { EmittedPortalProps, IState, PointerCoordinates } from '../types'
import { Action } from '../types'

import handleMovePortal from './handleMovePortal'
import handleResizePortal from './handleResizePortal'

const getPointerCoordinates = (
    event: MouseEvent | TouchEvent
): PointerCoordinates => {
    if ('touches' in event && event.touches.length > 0) {
        const touch = event.touches[0]
        return {
            clientX: touch.clientX,
            clientY: touch.clientY,
            pageX: touch.pageX,
            pageY: touch.pageY,
        }
    }

    if ('changedTouches' in event && event.changedTouches.length > 0) {
        const touch = event.changedTouches[0]
        return {
            clientX: touch.clientX,
            clientY: touch.clientY,
            pageX: touch.pageX,
            pageY: touch.pageY,
        }
    }

    const mouseEvent = event as MouseEvent
    return {
        clientX: mouseEvent.clientX,
        clientY: mouseEvent.clientY,
        pageX: mouseEvent.pageX,
        pageY: mouseEvent.pageY,
    }
}

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
    let pendingCoords: PointerCoordinates | null = null

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
        event.preventDefault()

        const { portal } = getState()
        const coords = getPointerCoordinates(event)

        if (event.target) {
            const node = event.target as HTMLElement
            const action = node.getAttribute('data-action') as Action

            const emittedPortalProps: EmittedPortalProps = {
                X: coords.pageX,
                Y: coords.pageY,
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

    const handlePointerUp = () => {
        const { action } = getState()

        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId)
            animationFrameId = null
        }
        pendingCoords = null

        if (action) {
            setState({
                action: null,
            })
        }
    }

    const processPointerMove = () => {
        animationFrameId = null

        if (!pendingCoords) {
            return
        }

        const coords = pendingCoords
        pendingCoords = null

        const { action } = getState()

        if (!action) {
            return
        }

        switch (action) {
            case Action.MOVE:
                handleMovePortal(coords, getState, setState)
                break

            default:
                handleResizePortal(coords, getState, setState)
        }
    }

    const handlePointerMove = (event: MouseEvent | TouchEvent) => {
        const { action } = getState()

        if (!action) {
            return
        }

        event.preventDefault()
        pendingCoords = getPointerCoordinates(event)

        if (animationFrameId === null) {
            animationFrameId = requestAnimationFrame(processPointerMove)
        }
    }

    if (rootElement) {
        rootElement.addEventListener('mouseup', handlePointerUp)
        rootElement.addEventListener('touchend', handlePointerUp)
        rootElement.addEventListener('touchcancel', handlePointerUp)
    }

    if (portalElement) {
        portalElement.addEventListener('mousedown', handlePointerDown)
        portalElement.addEventListener('touchstart', handlePointerDown, {
            passive: false,
        })
    }

    if (portalAreaElement) {
        portalAreaElement.addEventListener('mousemove', handlePointerMove)
        portalAreaElement.addEventListener('touchmove', handlePointerMove, {
            passive: false,
        })
    }

    return () => {
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId)
        }
        if (rootElement) {
            rootElement.removeEventListener('mouseup', handlePointerUp)
            rootElement.removeEventListener('touchend', handlePointerUp)
            rootElement.removeEventListener('touchcancel', handlePointerUp)
        }
        if (portalElement) {
            portalElement.removeEventListener('mousedown', handlePointerDown)
            portalElement.removeEventListener('touchstart', handlePointerDown)
        }
        if (portalAreaElement) {
            portalAreaElement.removeEventListener(
                'mousemove',
                handlePointerMove
            )
            portalAreaElement.removeEventListener(
                'touchmove',
                handlePointerMove
            )
        }
    }
}

export default registerMouseEvents
