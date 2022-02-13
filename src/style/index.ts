import { IClassNames } from '@src/types'
import getCssContainerStyle from './cssContainer'

const getClassName = () =>
    `hq-cropper__${Math.random().toString(36).substring(2)}_${Math.random()
        .toString(36)
        .substring(2)}`

const extractClassNames = (classNames?: string[]): string[] => classNames || []

export const setClassNames = (node: Element, classNames: string[]): void => {
    for (const className of classNames) {
        node.classList.add(className)
    }
}

const getClassNames = (css: Partial<IClassNames>): IClassNames => {
    const classNames: IClassNames = {
        container: [getClassName(), ...extractClassNames(css.container)],
    }

    const styleSource = `
        ${getCssContainerStyle(classNames.container[0])}
    `

    const style = document.createElement('style')
    style.innerHTML = styleSource

    const head = document.getElementsByTagName('head')[0]
    const headStyle = document.getElementsByTagName('style')[0]
    head.prepend(style)

    return classNames
}

export default getClassNames
