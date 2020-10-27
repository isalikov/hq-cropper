import { applyClassNames } from '../utils'

function getHandler(css = { }) {
    const node = document.createElement('span')

    node.setAttribute('data-action', 'move')

    applyClassNames(node, css.handler)

    return node
}

function getDotTL(css = { }) {
    const node = document.createElement('span')

    node.setAttribute('data-action', 'tl')

    applyClassNames(node, css.dotTL)

    return node
}

function getDotTR(css = { }) {
    const node = document.createElement('span')

    node.setAttribute('data-action', 'tr')

    applyClassNames(node, css.dotTR)

    return node
}

function getDotBR(css = { }) {
    const node = document.createElement('span')

    node.setAttribute('data-action', 'br')

    applyClassNames(node, css.dotBR)

    return node
}

function getDotBL(css = { }) {
    const node = document.createElement('span')

    node.setAttribute('data-action', 'bl')

    applyClassNames(node, css.dotBL)

    return node
}

function getFakeSource(css = { }, state) {
    const node = document.createElement('img')

    node.setAttribute('alt', 'fake')
    node.setAttribute('crossOrigin', 'anonymous')
    node.setAttribute('src', state.source)

    applyClassNames(node, css.fakeSourceImage)

    node.style = `
        height: ${state.sourceHeight}px;
        marginLeft: ${-state.portalLeft}px;
        marginTop: ${-state.portalTop}px;
        with: ${state.sourceWidth}px;
    `

    return node
}

function getFakeViewContent(css = { }, state) {
    const node = document.createElement('div')

    applyClassNames(node, css.fakeViewContent)

    node.appendChild(
        getFakeSource(css, state),
    )

    return node
}

function getViewContent(css = { }, state) {
    const node = document.createElement('div')

    applyClassNames(node, css.viewContent)

    node.style = `
        height: ${state.portalSize}px;
        left: ${state.portalLeft}px;
        top: ${state.portalTop}px;
        width: ${state.portalSize}px;
    `

    node.appendChild(
        getFakeViewContent(css, state),
    )

    node.appendChild(
        getHandler(css),
    )

    node.appendChild(
        getDotTL(css),
    )

    node.appendChild(
        getDotTR(css),
    )

    node.appendChild(
        getDotBR(css),
    )

    node.appendChild(
        getDotBL(css),
    )

    return node
}

function getShadowContainer(css = { }, state) {
    const node = document.createElement('div')

    applyClassNames(node, css.shadow)

    node.style = `
        height: ${state.sourceHeight}px;
        left: ${(state.frameSize - state.sourceWidth) / 2}px;
        top: ${(state.frameSize - state.sourceHeight) / 2}px;
        width: ${state.sourceWidth}px;
    `

    node.appendChild(
        getViewContent(css, state),
    )

    return node
}

function getSubmitButton(css = { }, state, labels) {
    const node = document.createElement('button')

    applyClassNames(node, css.submitButton)

    node.innerText = labels.submitButton

    return node
}

function getCancelButton(css = { }, state, labels) {
    const node = document.createElement('button')

    applyClassNames(node, css.cancelButton)

    node.innerText = labels.cancelButton

    return node
}

function getActionsContainer(css = { }, state, labels) {
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

function getResultImage(css = { }, state) {
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
        height: ${state.sourceHeight}px;
        maxHeight: ${state.frameSize}px;
        maxWidth: ${state.frameSize}px;
        width: ${state.sourceWidth}px;
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

    node.appendChild(
        getShadowContainer(css, state),
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

function getPortal(css = { }, state, labels) {
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

export default function getDomTree(css = { }, state, labels) {
    const node = document.createElement('div')

    applyClassNames(node, css.container)

    node.appendChild(
        getPortal(css, state, labels),
    )

    return node
}
