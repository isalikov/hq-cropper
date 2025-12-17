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
     * Minimum portal size (prevents portal from becoming too small to interact with)
     */
    minPortalSize: number

    /**
     * Frame padding
     */
    framePadding: number

    /**
     * Result image compression (0-1 for JPEG)
     */
    compression: number

    /**
     * Output image size in pixels (0 = use original selection size)
     */
    outputSize: number

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

    /**
     * Maximum file size in bytes (0 = no limit)
     */
    maxFileSize: number

    /**
     * Allowed MIME types for input files
     */
    allowedTypes: string[]
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

/**
 * Error handler callback
 */
export type ErrorHandler = (message: string) => void

export type ListenerAction<T> = (value: T, target: IState, prop: string) => void

/**
 * Unified pointer coordinates for mouse and touch events
 */
export interface PointerCoordinates {
    clientX: number
    clientY: number
    pageX: number
    pageY: number
}

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
