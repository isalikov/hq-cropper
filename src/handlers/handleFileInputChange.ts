import type {
    ErrorHandler,
    FileChangeEvent,
    IState,
    ListenerAction,
    PortalProps,
} from '../types'
import { getFrameProps, getPortalProps } from '../helpers'
import { initialState } from '../state'
import { mountRootNode } from '../nodes'
import {
    setHeaderTitle,
    setMountProps,
    setPortalProps,
    setPreviewProps,
} from '../observers'

import handleCropImage from './handleCropImage'
import registerMouseEvents from './registerMouseEvents'

const BYTES_IN_MB = 1024 * 1024

const validateFile = (file: File, config: IState['config']): string | null => {
    if (!config.allowedTypes.includes(file.type)) {
        return `Invalid file type "${file.type}". Allowed types: ${config.allowedTypes.join(', ')}`
    }

    if (config.maxFileSize > 0 && file.size > config.maxFileSize) {
        const maxSizeMB = (config.maxFileSize / BYTES_IN_MB).toFixed(2)
        const fileSizeMB = (file.size / BYTES_IN_MB).toFixed(2)
        return `File size (${fileSizeMB}MB) exceeds maximum allowed size (${maxSizeMB}MB)`
    }

    return null
}

const handleFileInputChange = (
    event: FileChangeEvent<HTMLInputElement>,
    getState: () => IState,
    setState: (state: Partial<IState>) => void,
    onSubmit: (result: string, blob: Blob | null, state: IState) => void,
    subscribe: <T>(prop: string, action: ListenerAction<T>) => string,
    unsubscribeAll: () => void,
    onError?: ErrorHandler
): void => {
    const handleError = (message: string): void => {
        if (onError) {
            onError(message)
        } else {
            console.error(`HqCropper: ${message}`)
        }
    }

    if (!event.target.files || event.target.files.length === 0) {
        handleError("Can't read file input")
        return
    }

    const file = event.target.files[0]
    const { config } = getState()

    const validationError = validateFile(file, config)
    if (validationError) {
        handleError(validationError)
        event.target.value = ''
        return
    }

    const reader = new FileReader()

    let cleanupMouseEvents: (() => void) | null = null

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleClose(e)
        }
    }

    const close = () => {
        const state = getState()

        const node = document.querySelector<HTMLDivElement>(
            `.${state.css?.root[0]}`
        )

        if (node && node.parentNode) {
            node.parentNode.removeChild(node)
            document.removeEventListener('keydown', handleKeyDown)
            if (cleanupMouseEvents) {
                cleanupMouseEvents()
            }
            unsubscribeAll()
            setState(initialState)
        }
    }

    document.addEventListener('keydown', handleKeyDown)

    const handleClose = (e: Event) => {
        e.preventDefault()
        close()
    }

    const handleSubmit = (e: Event) => {
        e.preventDefault()

        const state = getState()

        handleCropImage(getState).then(([base64, blob]) => {
            onSubmit(base64, blob, state)
            handleClose(e)
        })
    }

    reader.onload = (data) => {
        const image = new Image()

        if (!data.target || typeof data.target.result !== 'string') {
            handleError("Can't load result image")
            return
        }

        image.src = data.target.result

        image.onerror = () => {
            handleError('Failed to load image')
        }

        image.onload = () => {
            mountRootNode(getState, handleSubmit, handleClose)

            subscribe<string>('fileName', setHeaderTitle)
            subscribe<string>('sourceBase64', setMountProps)
            subscribe<PortalProps>('portal', setPortalProps)
            subscribe<PortalProps>('portal', setPreviewProps)

            const frame = getFrameProps(getState, image)
            const portal = getPortalProps(getState, frame)

            setState({
                frame,
                portal,
                fileName: file.name,
                sourceBase64: data.target?.result as string,
                sourceHeight: image.height,
                sourceWidth: image.width,
            })

            cleanupMouseEvents = registerMouseEvents(getState, setState)
        }
    }

    reader.onerror = () => {
        handleError('Failed to read file')
    }

    reader.readAsDataURL(file)

    /* clear value for handle cb next time */

    event.target.value = ''
}

export default handleFileInputChange
