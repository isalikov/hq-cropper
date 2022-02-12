import { IClassNames } from '@src/types'
import { classnames } from '@src/utils'

import initial from './initialClassNames'

const getClassNames = (
    overrideClassNames?: Partial<IClassNames>
): IClassNames => ({
    container: classnames(initial.container, overrideClassNames?.container),
})

export default getClassNames
