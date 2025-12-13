import useState from './state'
import { handleFileInputChange } from './handlers'
import { mountFileInput } from './nodes'
import type {
    ErrorHandler,
    FileChangeEvent,
    HqCropperInstance,
    IClassNames,
    IConfig,
    IState,
} from './types'

export const HqCropper = (
    onSubmit: (base64: string, blob: Blob | null, state: IState) => void,
    config?: Partial<IConfig>,
    css?: Partial<IClassNames>,
    onError?: ErrorHandler
): HqCropperInstance => {
    const { getState, setState, subscribe, unsubscribeAll } = useState(
        config,
        css
    )

    const fileInput = mountFileInput(
        (event: FileChangeEvent<HTMLInputElement>) =>
            handleFileInputChange(
                event,
                getState,
                setState,
                onSubmit,
                subscribe,
                unsubscribeAll,
                onError
            )
    )

    return {
        open: () => fileInput.click(),
    }
}
