import { applyClassNames } from '../utils'

export function getSubmitButton(css = { }, state, labels) {
    const node = document.createElement('button')

    applyClassNames(node, css.submitButton)

    node.innerText = labels.submitButton

    return node
}

export function getCancelButton(css = { }, state, labels) {
    const node = document.createElement('button')

    applyClassNames(node, css.cancelButton)

    node.innerText = labels.cancelButton

    return node
}

export function getActionsContainer(css = { }, state, labels) {
    const node = document.createElement('div')

    applyClassNames(node, css.actions)

    node.appendChild(
        getCancelButton(css, state, labels),
    )

    node.appendChild(
        getSubmitButton(css, state, labels),
    )

    return node
}

export function getResultImage(css = { }, state) {
    const node = document.createElement('img')

    node.setAttribute('alt', 'result')
    node.setAttribute('crossOrigin', 'anonymous')
    node.setAttribute('src', state.resultImage)

    applyClassNames(node, css.resultImage)

    return node
}

function getSourceImage(css = { }, state) {
    const node = document.createElement('img')

    node.setAttribute('alt', 'source')
    node.setAttribute('crossOrigin', 'anonymous')
    node.setAttribute('src', state.source)

    applyClassNames(node, css.sourceImage)

    node.style = `
        height: ${state.sourceHeight}px,
        maxHeight: ${state.frameSize}px,
        maxWidth: ${state.frameSize}px,
        width: ${state.sourceWidth}px,
    `

    return node
}

function getFrame(css = { }, state) {
    const node = document.createElement('div')

    applyClassNames(node, css.frame)

    node.style = `
        width: ${state.frameSize}px;
        height: ${state.frameSize}px;
    `

    node.appendChild(
        getSourceImage(css, state),
    )

    return node
}

function getPreview(css = { }, state, labels) {
    const node = document.createElement('div')

    applyClassNames(node, css.preview)

    node.appendChild(
        getResultImage(css, state),
    )

    node.appendChild(
        getActionsContainer(css, state, labels),
    )

    return node
}

function getPortal(css = {}, state, labels) {
    const node = document.createElement('div')

    applyClassNames(node, css.portal)

    node.appendChild(
        getFrame(css, state),
    )

    node.appendChild(
        getPreview(css, state, labels),
    )

    return node
}

export default function getDomTree(css = {}, state, labels) {
    const node = document.createElement('div')

    applyClassNames(node, css.container)

    node.appendChild(
        getPortal(css, state, labels),
    )

    return node
}
