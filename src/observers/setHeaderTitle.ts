import type { ApplicationState } from '../types'
import { getElement } from './domCache'

const setHeaderTitle = (value: string, state: ApplicationState) => {
    const header = getElement('header', state.css)

    if (header) {
        header.innerText = value
    }
}

export default setHeaderTitle
