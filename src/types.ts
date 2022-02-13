export enum Action {
    BL, // Resizing portal to bottom left
    BR, // Resizing portal to bottom right
    TL, // Resizing portal to top left
    TR, // Resizing portal to top right
    MOVE, // Moving portal
}

export interface IClassNames {
    root: string[]
    container: string[]
    footer: string[]
    body: string[]
    applyButton: string[]
    cancelButton: string[]
}

export interface IConfig {
    /**
     * Initial Portal position [X: number, Y: number] | 'center'
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

export interface IState {
    /**
     * Crop portal action type
     */
    action: Action | null

    /**
     * Rendered Frame height
     */
    frameHeight: number

    /**
     * Rendered Frame width
     */
    frameWidth: number

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
     * Portal X position
     */
    portalX: number

    /**
     * Portal Y position
     */
    portalY: number

    /**
     * Portal size
     */
    portalSize: number

    /**
     * Instance config
     */
    config: IConfig

    /**
     * Css class names
     */
    css: IClassNames
}

export type FileChangeEvent<T = EventTarget> = {
    target: T
}

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
