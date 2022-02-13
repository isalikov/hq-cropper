import { IClassNames, IConfig, IState } from '@src/types'

import getClassNames from '@src/style'
import createState from './createState'

export const initialState: IState = {
    action: null,
    frameHeight: 0,
    frameWidth: 0,
    resultBase64: '',
    sourceBase64: '',
    fileName: '',
    sourceHeight: 0,
    sourceWidth: 0,
    portalX: 0,
    portalY: 0,
    portalSize: 0,
    css: getClassNames({}),
    config: {
        applyButtonLabel: 'Apply',
        cancelButtonLabel: 'Cancel',
        compression: 0.8,
        portalPosition: 'center',
        portalSize: 150,
        quality: 1.03,
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
