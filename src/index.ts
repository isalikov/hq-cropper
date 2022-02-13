import state from '@src/state'
import { handleFileInputChange } from '@src/handlers'
import { mountFileInput } from '@src/nodes'
import { HqCropperType } from '@src/types'

const HqCropper: HqCropperType = (onSubmit, config, css) => {
    const { getState, setState } = state(config, css)

    const fileInput = mountFileInput((event) =>
        handleFileInputChange(event, getState, setState, onSubmit)
    )

    return {
        open: () => fileInput.click(),
    }
}

export default HqCropper
