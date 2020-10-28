/* global HqCropper */

document.addEventListener('DOMContentLoaded', () => {
    const hqCropper = HqCropper((image) => {
        document.querySelector('#image-preview').setAttribute('src', image)
    }, { })

    document.querySelector('#change-image-button')
        .addEventListener('click', hqCropper.open, false)
})
