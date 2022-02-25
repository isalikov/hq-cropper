import './style.css'

import { HqCropper } from '../src'

const main = (): void => {
    const hqCropper = HqCropper(
        (result) => {
            const imgElement =
                document.querySelector<HTMLImageElement>('#result-image')

            if (imgElement) {
                imgElement.setAttribute('src', result)
            }
        },
        {
            framePadding: 10,
        },
        {
            body: ['cropBody'],
        }
    )

    const button = document.querySelector<HTMLButtonElement>(
        '#change-image-button'
    )

    if (button) {
        button.addEventListener('click', () => hqCropper.open())
    }
}

main()
