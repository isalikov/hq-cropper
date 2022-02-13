import { IState } from '@src/types'

/**
 * @param getState
 * [X, Y, width]
 */
const getInitialPortal = (getState: () => IState): [number, number, number] => {
    const { config, css } = getState()

    if (
        Array.isArray(config.portalPosition) &&
        config.portalPosition.length === 2
    ) {
        const [X, Y] = config.portalPosition
        return [X, Y, config.portalSize]
    }

    const body = document.querySelector<HTMLDivElement>(`.${css.body[0]}`)

    if (!body) {
        return [0, 0, config.portalSize]
    }

    const { width, height } = body.getBoundingClientRect()

    if (
        config.portalPosition === 'center' &&
        config.portalSize < width &&
        config.portalSize < height
    ) {
        const X = (width - config.portalSize) / 2
        const Y = (height - config.portalSize) / 2

        return [X, Y, config.portalSize]
    }

    return [0, 0, Math.max(width, height)]
}

export default getInitialPortal
