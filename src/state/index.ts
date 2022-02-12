import getClassNames from '@src/css/getClassNames'
import { IConfig } from '@src/types'
import { deepMerge } from '@src/utils'

import createState from './createState'

const initialConfig: IConfig = {
    applyButtonLabel: 'Apply',
    cancelButtonLabel: 'Cancel',
    classnames: {},
    compression: 0.8,
    portalPosition: 'center',
    quality: 1.03,
    type: 'jpeg',
}

const state = (config: Partial<IConfig>) =>
    createState({
        action: null,
        css: getClassNames(config.classnames),
        config: deepMerge<IConfig>(initialConfig, config),
        frameHeight: 0,
        frameWidth: 0,
        result: '',
        source: '',
        sourceHeight: 0,
        sourceWidth: 0,
        x: 0,
        y: 0,
    })

export default state
