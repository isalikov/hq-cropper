export enum Action {
    BL, // Resizing portal to bottom left
    BR, // Resizing portal to bottom right
    TL, // Resizing portal to top left
    TR, // Resizing portal to top right
    MOVE, // Moving portal
}

export interface IClassNames {
    applyButton: string[]
    body: string[]
    cancelButton: string[]
    container: string[]
    footer: string[]
    header: string[]
    portalArea: string[]
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

export type PortalProps = {
    left: number
    top: number
    size: number
}

export type FrameProps = {
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
     * Result base64 string
     */
    resultBase64: string

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
}

/**
 * Initial position of portal center [Left, Top] | 'center'
 */
export type InitialPortalPosition = [number, number] | 'center'

export type ResultImageType = 'jpeg' | 'png'

export type HqCropperInstance = {
    open: () => void
}

export type HqCropperType = (
    onSubmit: (img: string) => void,
    options?: Partial<IConfig>,
    css?: Partial<IClassNames>
) => HqCropperInstance

export type ListenerAction<T extends unknown> = (
    value: T,
    target: IState,
    prop: string
) => void

export type Listener<T extends unknown> = {
    id: string
    action: ListenerAction<T>
}

export type CreateState = {
    getState: () => IState
    setState: (state: Partial<IState>) => void
    subscribe: <T extends unknown>(
        prop: string,
        action: ListenerAction<T>
    ) => string
}
