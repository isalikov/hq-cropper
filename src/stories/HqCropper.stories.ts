import type { Meta, StoryObj } from '@storybook/html'
import { HqCropper } from '../index'
import type { IConfig, IState } from '../types'

interface StoryArgs {
    config?: Partial<IConfig>
    description?: string
}

const createCropperStory = (args: StoryArgs = {}): HTMLElement => {
    const container = document.createElement('div')
    container.style.padding = '20px'

    const description = document.createElement('p')
    description.textContent =
        args.description || 'Click the button to open the cropper'
    description.style.marginBottom = '16px'
    description.style.color = '#666'
    container.appendChild(description)

    const button = document.createElement('button')
    button.textContent = 'Select Image'
    button.style.cssText = `
        padding: 12px 24px;
        font-size: 16px;
        cursor: pointer;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
    `
    container.appendChild(button)

    const resultContainer = document.createElement('div')
    resultContainer.style.marginTop = '20px'
    container.appendChild(resultContainer)

    const cropper = HqCropper(
        (base64: string, blob: Blob | null, state: IState) => {
            resultContainer.innerHTML = ''

            const img = document.createElement('img')
            img.src = base64
            img.style.cssText = `
                max-width: 300px;
                border: 1px solid #ddd;
                border-radius: 4px;
            `
            resultContainer.appendChild(img)

            const info = document.createElement('div')
            info.style.cssText =
                'margin-top: 12px; font-size: 14px; color: #666;'
            info.innerHTML = `
                <p><strong>File:</strong> ${state.fileName}</p>
                <p><strong>Original:</strong> ${state.sourceWidth} × ${state.sourceHeight}px</p>
                <p><strong>Blob size:</strong> ${blob ? (blob.size / 1024).toFixed(2) + ' KB' : 'N/A'}</p>
            `
            resultContainer.appendChild(info)
        },
        args.config,
        undefined,
        (message: string) => {
            resultContainer.innerHTML = `<p style="color: red;">Error: ${message}</p>`
        }
    )

    button.addEventListener('click', () => cropper.open())

    return container
}

const meta: Meta<StoryArgs> = {
    title: 'HqCropper',
    render: (args) => createCropperStory(args),
    parameters: {
        layout: 'padded',
    },
}

export default meta
type Story = StoryObj<StoryArgs>

/**
 * Default configuration with all standard settings
 */
export const Default: Story = {
    args: {
        description: 'Default cropper with standard settings',
    },
}

/**
 * Small portal size for precise cropping
 */
export const SmallPortal: Story = {
    args: {
        config: {
            portalSize: 80,
            minPortalSize: 30,
        },
        description: 'Small portal (80px) with minimum size 30px',
    },
}

/**
 * Large portal size for quick cropping
 */
export const LargePortal: Story = {
    args: {
        config: {
            portalSize: 250,
        },
        description: 'Large portal (250px) for quick selection',
    },
}

/**
 * Custom initial portal position (top-left corner)
 */
export const TopLeftPosition: Story = {
    args: {
        config: {
            portalPosition: [50, 50],
        },
        description: 'Portal starts at position [50, 50] from frame origin',
    },
}

/**
 * High quality output with PNG format
 */
export const HighQualityPNG: Story = {
    args: {
        config: {
            type: 'png',
            quality: 2,
            compression: 1,
        },
        description: 'High quality PNG output (quality: 2, no compression)',
    },
}

/**
 * Compressed JPEG output for smaller file size
 */
export const CompressedJPEG: Story = {
    args: {
        config: {
            type: 'jpeg',
            quality: 1.5,
            compression: 0.7,
        },
        description: 'Compressed JPEG output (70% compression)',
    },
}

/**
 * Custom button labels (localization example)
 */
export const RussianLabels: Story = {
    args: {
        config: {
            applyButtonLabel: 'Применить',
            cancelButtonLabel: 'Отмена',
        },
        description: 'Custom Russian button labels',
    },
}

/**
 * File size restriction (max 2MB)
 */
export const MaxFileSize2MB: Story = {
    args: {
        config: {
            maxFileSize: 2 * 1024 * 1024,
        },
        description: 'Maximum file size limited to 2MB',
    },
}

/**
 * Only JPEG and PNG allowed
 */
export const OnlyJpegPng: Story = {
    args: {
        config: {
            allowedTypes: ['image/jpeg', 'image/png'],
        },
        description: 'Only JPEG and PNG files allowed (no GIF, WebP)',
    },
}

/**
 * Larger frame padding for better UX
 */
export const LargeFramePadding: Story = {
    args: {
        config: {
            framePadding: 20,
        },
        description: 'Larger frame padding (20px) for easier edge interaction',
    },
}
