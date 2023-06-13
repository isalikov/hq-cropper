import './style.css'

import { HqCropper } from '../src'

const main = (): void => {
    const hqCropper = HqCropper(
        (base64) => {
            const imgElement =
                document.querySelector<HTMLImageElement>('#result-image')

            if (imgElement) {
                imgElement.setAttribute('src', base64)
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
