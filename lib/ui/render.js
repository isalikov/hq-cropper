import getDomTree from './dom'

export default function render(css = {}, state, labels) {
    document.body.appendChild(
        getDomTree(css, state, labels),
    )
}
