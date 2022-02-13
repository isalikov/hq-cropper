import { IState } from '@src/types'
import { setClassNames } from '@src/style'

const render = (state: IState): void => {
    const container = document.createElement<'div'>('div')
    setClassNames(container, state.css.container)

    document.body.appendChild(container)
}

export default render
