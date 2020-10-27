export default function mount(onChange) {
    const node = document.createElement('input')

    node.style.display = 'none'

    node.setAttribute('type', 'file')

    node.addEventListener('change', onChange, false)

    document.body.appendChild(node)

    return node
}
