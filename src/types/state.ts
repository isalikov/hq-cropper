export type State = {
    actionType: string | null
    frameSize: number
    imageHeight: number
    imageWidth: number
    isDragging: boolean
    onMouseDownCursorX: number
    onMouseDownCursorY: number
    onMouseDownPortalLeft: number
    onMouseDownPortalSize: number
    onMouseDownPortalTop: number
    portalLeft: number
    portalSize: number
    portalTop: number
    resultImage: string
    source: string
    sourceHeight: number
    sourceWidth: number
}

export type ListenerAction<T extends unknown> = (
    value: T,
    target: State,
    prop: string
) => void

export type Listener<T extends unknown> = {
    id: string
    action: ListenerAction<T>
}

export type CreateState = {
    getState: () => State
    setState: (state: Partial<State>) => void
    subscribe: <T extends unknown>(
        prop: string,
        action: ListenerAction<T>
    ) => string
}
