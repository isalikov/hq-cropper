import mountStyles from '@src/css/mountStyles'
import { IState } from '@src/types'

const render = (state: IState): void => {
    mountStyles()
    const root = document.createElement<'div'>('div')
    root.classList.add(state.css.container)

    document.body.appendChild(root)
}

export default render
