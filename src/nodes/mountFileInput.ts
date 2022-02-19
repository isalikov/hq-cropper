const mountFileInput = (onChange): HTMLInputElement => {
    const element = document.createElement<'input'>('input')

    element.style.display = 'none'

    element.setAttribute('type', 'file')
    element.setAttribute('accept', 'image/x-png,image/jpeg')

    element.addEventListener('change', onChange, false)

    document.body.appendChild(element)

    return element
}

export default mountFileInput
