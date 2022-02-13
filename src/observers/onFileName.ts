import { IState } from '@src/types'

const onFileName = (value: string, state: IState) => {
    const header = document.querySelector<HTMLImageElement>(
        `.${state.css.header[0]}`
    )

    if (header) {
        header.innerText = value
    }
}

export default onFileName
