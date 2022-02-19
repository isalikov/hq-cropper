import HqCropper from '@src/index'

const main = (): void => {
    const hqCropper = HqCropper((result) => {
        const imgElement =
            document.querySelector<HTMLImageElement>('#result-image')

        if (imgElement) {
            imgElement.setAttribute('src', result)
        }
    }, {})

    const button = document.querySelector<HTMLButtonElement>(
        '#change-image-button'
    )

    if (button) {
        button.addEventListener('click', () => hqCropper.open())
    }
}

main()
