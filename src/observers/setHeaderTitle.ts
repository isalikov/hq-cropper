import { IState } from '../types'

const setHeaderTitle = (value: string, state: IState) => {
    const header = document.querySelector<HTMLImageElement>(
        `.${state.css?.header[0]}`
    )

    if (header) {
        header.innerText = value
    }
}

export default setHeaderTitle
