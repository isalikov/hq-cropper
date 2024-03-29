import { FileChangeEvent, IState } from '../types'
import { getFrameProps, getPortalProps } from '../helpers'
import { initialState } from '../state'
import { mountRootNode } from '../nodes'

import handleCropImage from './handleCropImage'
import registerMouseEvents from './registerMouseEvents'

const handleFileInputChange = (
    event: FileChangeEvent<HTMLInputElement>,
    getState: () => IState,
    setState: (state: Partial<IState>) => void,
    onSubmit: (result: string, blob: Blob | null, state: IState) => void
): void => {
    if (!event.target.files || event.target.files.length === 0) {
        throw new Error("HqCropper: Can't read file input")
    }

    const file = event.target.files[0]
    const reader = new FileReader()

    const close = () => {
        const state = getState()

        const node = document.querySelector<HTMLDivElement>(
            `.${state.css?.root[0]}`
        )

        if (node && node.parentNode) {
            node.parentNode.removeChild(node)
            setState(initialState)
        }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            close()
        }
    }

    document.addEventListener('keydown', handleKeyDown)

    const handleClose = (e: Event) => {
        e.preventDefault()
        document.removeEventListener('keydown', handleKeyDown)
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
            throw new Error("HqCropper: Can't load result image")
        }

        image.src = data.target.result

        image.onload = () => {
            mountRootNode(getState, handleSubmit, handleClose)

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

            registerMouseEvents(getState, setState)
        }
    }

    reader.readAsDataURL(file)

    /* clear value for handle cb next time */
    // eslint-disable-next-line no-param-reassign
    event.target.value = ''
}

export default handleFileInputChange
