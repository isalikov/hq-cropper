import useState from './state'
import { handleFileInputChange } from './handlers'
import { mountFileInput } from './nodes'
import { HqCropperType, PortalProps } from './types'

import {
    setHeaderTitle,
    setMountProps,
    setPortalProps,
    setPreviewProps,
} from './observers'

const HqCropper: HqCropperType = (onSubmit, config, css) => {
    const { getState, setState, subscribe } = useState(config, css)

    const fileInput = mountFileInput((event) =>
        handleFileInputChange(event, getState, setState, onSubmit)
    )

    subscribe<string>('fileName', setHeaderTitle)
    subscribe<string>('sourceBase64', setMountProps)
    subscribe<PortalProps>('portal', setPortalProps)
    subscribe<PortalProps>('portal', setPreviewProps)

    return {
        open: () => fileInput.click(),
    }
}

export default HqCropper
