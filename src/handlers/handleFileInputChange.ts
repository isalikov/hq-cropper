import render from '@src/render'
import { Event, IState } from '@src/types'

const handleFileInputChange = (
    event: Event<HTMLInputElement>,
    getState: () => IState,
    setState: (state: IState) => void
): void => {
    if (!event.target.files || event.target.files.length === 0) {
        throw new Error("HqCropper: Can't read file input")
    }

    const file = event.target.files[0]
    const reader = new FileReader()

    const state = getState()

    reader.onload = (data) => {
        const image = new Image()

        if (!data.target || typeof data.target.result !== 'string') {
            throw new Error("HqCropper: Can't load result image")
        }

        image.src = data.target.result

        image.onload = () => {
            render(state)

            console.log(image)
        }
    }

    reader.readAsDataURL(file)

    /* clear value for handle cb next time */
    // eslint-disable-next-line no-param-reassign
    event.target.value = ''
}

export default handleFileInputChange
