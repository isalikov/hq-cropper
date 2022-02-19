import HqCropper from '@src/index'

const main = (): void => {
    const hqCropper = HqCropper((result, state) => console.log(state), {})

    const button = document.querySelector<HTMLButtonElement>(
        '#change-image-button'
    )

    if (button) {
        button.addEventListener('click', () => hqCropper.open())
    }
}

main()
