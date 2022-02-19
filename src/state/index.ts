import { IClassNames, IConfig, IState } from '@src/types'

import getClassNames from '@src/style'
import createState from './createState'

export const initialState: IState = {
    action: null,
    sourceBase64: '',
    fileName: '',
    sourceHeight: 0,
    sourceWidth: 0,
    frame: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    },
    portal: {
        left: 0,
        top: 0,
        size: 0,
    },
    emittedPortalProps: {
        X: 0,
        Y: 0,
        left: 0,
        top: 0,
    },
    config: {
        applyButtonLabel: 'Apply',
        cancelButtonLabel: 'Cancel',
        compression: 1,
        portalPosition: 'center',
        portalSize: 150,
        quality: 1.01,
        type: 'jpeg',
    },
}

const state = (config: Partial<IConfig> = {}, css: Partial<IClassNames> = {}) =>
    createState({
        ...initialState,
        config: { ...initialState.config, ...config },
        css: getClassNames(css),
    })

export default state
