import useState from '@src/state'
import { handleFileInputChange } from '@src/handlers'
import { mountFileInput } from '@src/nodes'
import { HqCropperType } from '@src/types'
import { onFileName, onSourceBase64 } from '@src/observers'

const HqCropper: HqCropperType = (onSubmit, config, css) => {
    const { getState, setState, subscribe } = useState(config, css)

    const fileInput = mountFileInput((event) =>
        handleFileInputChange(event, getState, setState, onSubmit)
    )

    subscribe<string>('fileName', onFileName)
    subscribe<string>('sourceBase64', onSourceBase64)

    return {
        open: () => fileInput.click(),
    }
}

export default HqCropper
