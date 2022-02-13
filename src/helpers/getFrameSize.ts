import { IState } from '@src/types'

/**
 * @param getState
 * [width, height]
 */
const getFrameSize = (getState: () => IState): [number, number] => {
    const state = getState()

    const body = document.querySelector<HTMLDivElement>(`.${state.css.body[0]}`)

    if (!body) {
        return [0, 0]
    }

    const { width, height } = body.getBoundingClientRect()

    return [width, height]
}

export default getFrameSize
