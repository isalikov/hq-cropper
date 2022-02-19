import { IClassNames } from '@src/types'

import getCssApplyButtonStyle from './getCssApplyButtonStyle'
import getCssBodyStyle from './getCssBodyStyle'
import getCssCancelButtonStyle from './getCssCancelButtonStyle'
import getCssContainerStyle from './getCssContainerStyle'
import getCssFooterStyle from './getCssFooterStyle'
import getCssHeader from './getCssHeader'
import getCssPortalAreaStyle from './getCssPortalAreaStyle'
import getCssRootStyle from './getCssRootStyle'
import getCssSourceImage from './getCssSourceImage'

const isDevelopment = process.env.NODE_ENV !== 'production'

const getClassName = (name: string) => {
    if (isDevelopment) {
        return `hq-cropper__${name}`
    }

    return `${Math.random().toString(36).substring(2)}_${Math.random()
        .toString(36)
        .substring(2)}`
}

const extractClassNames = (classNames?: string[]): string[] => classNames || []

export const setClassNames = (node: Element, classNames?: string[]): void => {
    if (classNames) {
        for (const className of classNames) {
            node.classList.add(className)
        }
    }
}

const getClassNames = (css: Partial<IClassNames>): IClassNames => {
    const classNames: IClassNames = {
        applyButton: [
            getClassName('applyButton'),
            ...extractClassNames(css.applyButton),
        ],
        cancelButton: [
            getClassName('cancelButton'),
            ...extractClassNames(css.cancelButton),
        ],
        container: [
            getClassName('container'),
            ...extractClassNames(css.container),
        ],
        sourceImage: [
            getClassName('sourceImage'),
            ...extractClassNames(css.sourceImage),
        ],
        body: [getClassName('body'), ...extractClassNames(css.body)],
        portalArea: [
            getClassName('portalArea'),
            ...extractClassNames(css.portalArea),
        ],
        header: [getClassName('header'), ...extractClassNames(css.header)],
        footer: [getClassName('footer'), ...extractClassNames(css.footer)],
        root: [getClassName('root'), ...extractClassNames(css.root)],
    }

    const styleSource = `
        ${getCssApplyButtonStyle(classNames.applyButton[0])}
        ${getCssBodyStyle(classNames.body[0])}
        ${getCssCancelButtonStyle(classNames.cancelButton[0])}
        ${getCssContainerStyle(classNames.container[0])}
        ${getCssFooterStyle(classNames.footer[0])}
        ${getCssHeader(classNames.header[0])}
        ${getCssPortalAreaStyle(classNames.portalArea[0])}
        ${getCssRootStyle(classNames.root[0])}
        ${getCssSourceImage(classNames.sourceImage[0])}
    `

    const style = document.createElement('style')
    style.innerHTML = styleSource

    document.getElementsByTagName('head')[0].prepend(style)

    return classNames
}

export default getClassNames
