import useState from './state'
import { handleFileInputChange } from './handlers'
import { mountFileInput } from './nodes'
import type {
    ErrorHandler,
    FileChangeEvent,
    HqCropperInstance,
    ClassNames,
    ConfigurationOptions,
    ApplicationState,
} from './types'

export const HqCropper = (
    onSubmit: (
        base64: string,
        blob: Blob | null,
        state: ApplicationState
    ) => void,
    config?: Partial<ConfigurationOptions>,
    css?: Partial<ClassNames>,
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
