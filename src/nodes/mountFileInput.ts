const mountFileInput = (onChange): HTMLInputElement => {
    const node = document.createElement<'input'>('input')

    node.style.display = 'none'

    node.setAttribute('type', 'file')
    node.setAttribute('accept', 'image/x-png,image/gif,image/jpeg')

    node.addEventListener('change', onChange, false)

    document.body.appendChild(node)

    return node
}

export default mountFileInput
