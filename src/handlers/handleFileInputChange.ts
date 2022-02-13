import { mountContainerNode } from '@src/nodes'
import { FileChangeEvent, IState } from '@src/types'

import { getFrameSize, getInitialPortal } from '@src/helpers'

import { initialState } from '@src/state'

const isDevelopment = process.env.NODE_ENV !== 'production'

const handleFileInputChange = (
    event: FileChangeEvent<HTMLInputElement>,
    getState: () => IState,
    setState: (state: Partial<IState>) => void,
    onSubmit: (img: string) => void
): void => {
    if (!event.target.files || event.target.files.length === 0) {
        throw new Error("HqCropper: Can't read file input")
    }

    const file = event.target.files[0]
    const reader = new FileReader()

    const handleClose = (e: Event) => {
        e.preventDefault()

        const state = getState()

        const node = document.querySelector<HTMLDivElement>(
            `.${state.css.root[0]}`
        )

        if (node && node.parentNode) {
            node.parentNode.removeChild(node)
            setState(initialState)
        }
    }

    const handleSubmit = (e: Event) => {
        e.preventDefault()

        const { resultBase64 } = getState()

        if (isDevelopment) {
            console.log(getState())
        } else {
            onSubmit(resultBase64)
            handleClose(e)
        }
    }

    reader.onload = (data) => {
        const image = new Image()

        if (!data.target || typeof data.target.result !== 'string') {
            throw new Error("HqCropper: Can't load result image")
        }

        image.src = data.target.result
        image.onload = () => {
            mountContainerNode(getState, handleSubmit, handleClose)

            const [frameWidth, frameHeight] = getFrameSize(getState)
            const [portalX, portalY, portalSize] = getInitialPortal(getState)

            setState({
                frameWidth,
                frameHeight,
                portalX,
                portalY,
                portalSize,
                sourceHeight: image.height,
                sourceWidth: image.width,
                sourceBase64: data.target?.result as string,
            })
        }
    }

    reader.readAsDataURL(file)

    /* clear value for handle cb next time */
    // eslint-disable-next-line no-param-reassign
    event.target.value = ''
}

export default handleFileInputChange
