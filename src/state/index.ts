import { IClassNames, IConfig } from '@src/types'

import getClassNames from '@src/style'
import createState from './createState'

const initialConfig: IConfig = {
    applyButtonLabel: 'Apply',
    cancelButtonLabel: 'Cancel',
    compression: 0.8,
    portalPosition: 'center',
    quality: 1.03,
    type: 'jpeg',
}

const state = (config: Partial<IConfig> = {}, css: Partial<IClassNames> = {}) =>
    createState({
        config: { ...initialConfig, ...config },
        action: null,
        frameHeight: 0,
        frameWidth: 0,
        result: '',
        source: '',
        sourceHeight: 0,
        sourceWidth: 0,
        x: 0,
        y: 0,
        css: getClassNames(css),
    })

export default state
