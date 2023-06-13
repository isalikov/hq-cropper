import useState from './state'
import { handleFileInputChange } from './handlers'
import { mountFileInput } from './nodes'
import {
    FileChangeEvent,
    HqCropperInstance,
    IClassNames,
    IConfig,
    IState,
    PortalProps,
} from './types'

import {
    setHeaderTitle,
    setMountProps,
    setPortalProps,
    setPreviewProps,
} from './observers'

export const HqCropper = (
    onSubmit: (base64: string, blob: Blob | null, state: IState) => void,
    config?: Partial<IConfig>,
    css?: Partial<IClassNames>
): HqCropperInstance => {
    const { getState, setState, subscribe } = useState(config, css)

    const fileInput = mountFileInput(
        (event: FileChangeEvent<HTMLInputElement>) =>
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
