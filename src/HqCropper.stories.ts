import type { Meta, StoryObj } from '@storybook/html'
import { HqCropper } from './index'
import type { IConfig } from './types'

interface HqCropperArgs {
    portalSize: number
    compression: number
    quality: number
    type: 'jpeg' | 'png'
    applyButtonLabel: string
    cancelButtonLabel: string
}

const meta: Meta<HqCropperArgs> = {
    title: 'HqCropper',
    argTypes: {
        portalSize: {
            control: { type: 'range', min: 50, max: 300, step: 10 },
            description: 'Initial portal size',
        },
        compression: {
            control: { type: 'range', min: 0.1, max: 1, step: 0.1 },
            description: 'Result image compression (0-1)',
        },
        quality: {
            control: { type: 'range', min: 1.01, max: 2, step: 0.01 },
            description: 'Result image quality (logarithm base)',
        },
        type: {
            control: { type: 'select' },
            options: ['jpeg', 'png'],
            description: 'Result image type',
        },
        applyButtonLabel: {
            control: 'text',
            description: 'Apply button label',
        },
        cancelButtonLabel: {
            control: 'text',
            description: 'Cancel button label',
        },
    },
    args: {
        portalSize: 150,
        compression: 0.9,
        quality: 1.1,
        type: 'jpeg',
        applyButtonLabel: 'Apply',
        cancelButtonLabel: 'Cancel',
    },
    render: (args) => {
        const container = document.createElement('div')
        container.style.padding = '20px'

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

        const preview = document.createElement('div')
        preview.style.cssText = `
            margin-top: 20px;
            display: none;
        `

        const previewTitle = document.createElement('h3')
        previewTitle.textContent = 'Cropped Result:'
        previewTitle.style.margin = '0 0 10px 0'

        const previewImage = document.createElement('img')
        previewImage.style.cssText = `
            max-width: 300px;
            border: 1px solid #ccc;
            border-radius: 4px;
        `

        const info = document.createElement('p')
        info.style.cssText = `
            margin-top: 10px;
            font-size: 14px;
            color: #666;
        `

        preview.appendChild(previewTitle)
        preview.appendChild(previewImage)
        preview.appendChild(info)

        const config: Partial<IConfig> = {
            portalSize: args.portalSize,
            compression: args.compression,
            quality: args.quality,
            type: args.type,
            applyButtonLabel: args.applyButtonLabel,
            cancelButtonLabel: args.cancelButtonLabel,
        }

        const cropper = HqCropper((base64, blob, state) => {
            previewImage.src = base64
            preview.style.display = 'block'

            const blobSize = blob
                ? `${(blob.size / 1024).toFixed(2)} KB`
                : 'N/A'
            info.textContent = `File: ${state.fileName} | Size: ${blobSize}`

            console.log('Cropped image:', { base64, blob, state })
        }, config)

        button.addEventListener('click', () => cropper.open())

        container.appendChild(button)
        container.appendChild(preview)

        return container
    },
}

export default meta

type Story = StoryObj<HqCropperArgs>

export const Default: Story = {}

export const HighQuality: Story = {
    args: {
        compression: 1,
        quality: 1.05,
        type: 'png',
    },
}

export const SmallPortal: Story = {
    args: {
        portalSize: 80,
    },
}

export const LargePortal: Story = {
    args: {
        portalSize: 250,
    },
}

export const CustomLabels: Story = {
    args: {
        applyButtonLabel: 'Crop Image',
        cancelButtonLabel: 'Dismiss',
    },
}
