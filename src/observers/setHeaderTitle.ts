import type { IState } from '../types'
import { getElement } from './domCache'

const setHeaderTitle = (value: string, state: IState) => {
    const header = getElement('header', state.css)

    if (header) {
        header.innerText = value
    }
}

export default setHeaderTitle
