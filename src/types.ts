export enum Action {
    MOVE = 'MOVE',
    RESIZE_TL = 'RESIZE_TL',
    RESIZE_TR = 'RESIZE_TR',
    RESIZE_BR = 'RESIZE_BR',
    RESIZE_BL = 'RESIZE_BL',
}

export interface IClassNames {
    applyButton: string[]
    body: string[]
    cancelButton: string[]
    container: string[]
    footer: string[]
    handlerMove: string[]
    handlerResizeBottomLeft: string[]
    handlerResizeBottomRight: string[]
    handlerResizeTopLeft: string[]
    handlerResizeTopRight: string[]
    header: string[]
    portal: string[]
    portalArea: string[]
    preview: string[]
    previewImage: string[]
    root: string[]
    sourceImage: string[]
}

export interface IConfig {
    /**
     * Initial position of portal center at frame [Left: number, Top: number] | 'center'
     */
    portalPosition: InitialPortalPosition

    /**
     * Initial Portal size
     */
    portalSize: number

    /**
     * Frame padding
     */
    framePadding: number

    /**
     * Result image compression
     */
    compression: number

    /**
     * Result image Quality (logarithm base of compressed image width and height)
     */
    quality: number

    /**
     * Result image type
     */
    type: ResultImageType

    /**
     * Apply Button label
     */
    applyButtonLabel: string

    /**
     * Cancel Button label
     */
    cancelButtonLabel: string
}

export interface EmittedPortalProps {
    X: number
    Y: number
    top: number
    left: number
    size: number
}

export interface PortalProps {
    left: number
    top: number
    size: number
}

export interface FrameProps {
    left: number
    top: number
    width: number
    height: number
}

export interface IState {
    /**
     * Crop portal action type
     */
    action: Action | null

    /**
     * Open file name
     */
    fileName: string

    /**
     * Source base64 string
     */
    sourceBase64: string

    /**
     * Source image height
     */
    sourceHeight: number

    /**
     * Source image height
     */
    sourceWidth: number

    /**
     * Rendered Frame prop
     */
    frame: FrameProps

    /**
     * Crop portal props
     */
    portal: PortalProps

    /**
     * On mouse down emitted props
     */
    emitted: EmittedPortalProps

    /**
     * Instance config
     */
    config: IConfig

    /**
     * Css class names
     */
    css?: IClassNames
}

export type FileChangeEvent<T = EventTarget> = {
    target: T
} & Event

/**
 * Initial position of portal center [Left, Top] | 'center'
 */
export type InitialPortalPosition = [number, number] | 'center'

export type ResultImageType = 'jpeg' | 'png'

export interface HqCropperInstance {
    open: () => void
}

export type ListenerAction<T> = (value: T, target: IState, prop: string) => void

export interface Listener<T> {
    id: string
    action: ListenerAction<T>
}

export interface CreateState {
    getState: () => IState
    setState: (state: Partial<IState>) => void
    subscribe: <T>(prop: string, action: ListenerAction<T>) => string
    unsubscribe: (id: string) => void
    unsubscribeAll: () => void
}
