import { IClassNames } from '@src/types'

import getCssApplyButtonStyle from './getCssApplyButtonStyle'
import getCssBodyStyle from './getCssBodyStyle'
import getCssCancelButtonStyle from './getCssCancelButtonStyle'
import getCssContainerStyle from './getCssContainerStyle'
import getCssFooterStyle from './getCssFooterStyle'
import getCssHeader from './getCssHeader'
import getCssMoveStyle from './getCssMoveStyle'
import getCssPortalAreaStyle from './getCssPortalAreaStyle'
import getCssPortalStyle from './getCssPortalStyle'
import getCssPreviewImageStyle from './getCssPreviewImageStyle'
import getCssPreviewStyle from './getCssPreviewStyle'
import getCssResizeBottomLeftStyle from './getCssResizeBottomLeftStyle'
import getCssResizeBottomRightStyle from './getCssResizeBottomRightStyle'
import getCssResizeTopLeftStyle from './getCssResizeTopLeftStyle'
import getCssResizeTopRightStyle from './getCssResizeTopRightStyle'
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
        handlerMove: [
            getClassName('handlerMove'),
            ...extractClassNames(css.handlerMove),
        ],
        handlerResizeTopLeft: [
            getClassName('handlerResizeTopLeft'),
            ...extractClassNames(css.handlerResizeTopLeft),
        ],
        handlerResizeTopRight: [
            getClassName('handlerResizeTopRight'),
            ...extractClassNames(css.handlerResizeTopRight),
        ],
        handlerResizeBottomLeft: [
            getClassName('handlerResizeBottomLeft'),
            ...extractClassNames(css.handlerResizeBottomLeft),
        ],
        handlerResizeBottomRight: [
            getClassName('handlerResizeBottomRight'),
            ...extractClassNames(css.handlerResizeBottomRight),
        ],
        sourceImage: [
            getClassName('sourceImage'),
            ...extractClassNames(css.sourceImage),
        ],
        portalArea: [
            getClassName('portalArea'),
            ...extractClassNames(css.portalArea),
        ],
        previewImage: [
            getClassName('previewImage'),
            ...extractClassNames(css.previewImage),
        ],
        body: [getClassName('body'), ...extractClassNames(css.body)],
        header: [getClassName('header'), ...extractClassNames(css.header)],
        footer: [getClassName('footer'), ...extractClassNames(css.footer)],
        portal: [getClassName('portal'), ...extractClassNames(css.portal)],
        preview: [getClassName('preview'), ...extractClassNames(css.preview)],
        root: [getClassName('root'), ...extractClassNames(css.root)],
    }

    const styleSource = `
        ${getCssApplyButtonStyle(classNames.applyButton[0])}
        ${getCssBodyStyle(classNames.body[0])}
        ${getCssCancelButtonStyle(classNames.cancelButton[0])}
        ${getCssContainerStyle(classNames.container[0])}
        ${getCssFooterStyle(classNames.footer[0])}
        ${getCssHeader(classNames.header[0])}
        ${getCssMoveStyle(classNames.handlerMove[0])}
        ${getCssPortalAreaStyle(classNames.portalArea[0])}
        ${getCssPortalStyle(classNames.portal[0])}
        ${getCssPreviewImageStyle(classNames.previewImage[0])}
        ${getCssPreviewStyle(classNames.preview[0])}
        ${getCssResizeBottomLeftStyle(classNames.handlerResizeBottomLeft[0])}
        ${getCssResizeBottomRightStyle(classNames.handlerResizeBottomRight[0])}
        ${getCssResizeTopLeftStyle(classNames.handlerResizeTopLeft[0])}
        ${getCssResizeTopRightStyle(classNames.handlerResizeTopRight[0])}
        ${getCssRootStyle(classNames.root[0])}
        ${getCssSourceImage(classNames.sourceImage[0])}
    `

    const style = document.createElement('style')
    style.innerHTML = styleSource

    document.getElementsByTagName('head')[0].prepend(style)

    return classNames
}

export default getClassNames
