import { setClassNames } from '../style'
import { IState } from '../types'

const mountSourceImageNode = (getState: () => IState): Element => {
    const state = getState()
    const element = document.createElement<'img'>('img')
    setClassNames(element, state.css?.sourceImage)

    element.setAttribute('alt', 'source')
    element.setAttribute('crossOrigin', 'anonymous')
    element.setAttribute('draggable', 'false')
    element.setAttribute('src', state.sourceBase64)

    return element
}

export default mountSourceImageNode
