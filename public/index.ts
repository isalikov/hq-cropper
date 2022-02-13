import HqCropper from '@src/index'

const main = (): void => {
    const hqCropper = HqCropper(console.log)

    const button = document.querySelector<HTMLButtonElement>(
        '#change-image-button'
    )

    if (button) {
        button.addEventListener('click', () => hqCropper.open())
    }
}

main()
