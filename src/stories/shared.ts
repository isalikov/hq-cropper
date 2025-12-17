import type { Meta } from '@storybook/html'
import { HqCropper } from '../index'
import type { IState, ResultImageType } from '../types'

export interface StoryArgs {
    description: string
    portalSize: number
    minPortalSize: number
    framePadding: number
    outputSize: number
    compression: number
    type: ResultImageType
    applyButtonLabel: string
    cancelButtonLabel: string
    maxFileSize: number
}

export const createCropperStory = (args: StoryArgs): HTMLElement => {
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
                <p><strong>Output:</strong> ${args.outputSize || 'original size'}px</p>
                <p><strong>Blob size:</strong> ${blob ? (blob.size / 1024).toFixed(2) + ' KB' : 'N/A'}</p>
            `
            resultContainer.appendChild(info)
        },
        {
            portalSize: args.portalSize,
            minPortalSize: args.minPortalSize,
            framePadding: args.framePadding,
            outputSize: args.outputSize,
            compression: args.compression,
            type: args.type,
            applyButtonLabel: args.applyButtonLabel,
            cancelButtonLabel: args.cancelButtonLabel,
            maxFileSize: args.maxFileSize,
        },
        undefined,
        (message: string) => {
            resultContainer.innerHTML = `<p style="color: red;">Error: ${message}</p>`
        }
    )

    button.addEventListener('click', () => cropper.open())

    return container
}

export const defaultArgs: StoryArgs = {
    description: 'Default cropper with standard settings',
    portalSize: 150,
    minPortalSize: 50,
    framePadding: 3,
    outputSize: 0,
    compression: 1,
    type: 'jpeg',
    applyButtonLabel: 'Apply',
    cancelButtonLabel: 'Cancel',
    maxFileSize: 0,
}

export const defaultArgTypes: Meta<StoryArgs>['argTypes'] = {
    description: {
        control: 'text',
        description: 'Story description',
        table: { category: 'Story' },
    },
    portalSize: {
        control: { type: 'range', min: 50, max: 400, step: 10 },
        description: 'Initial size of crop portal in pixels',
        table: { category: 'Portal' },
    },
    minPortalSize: {
        control: { type: 'range', min: 20, max: 200, step: 10 },
        description: 'Minimum portal size',
        table: { category: 'Portal' },
    },
    framePadding: {
        control: { type: 'range', min: 0, max: 50, step: 1 },
        description: 'Padding around the image frame',
        table: { category: 'Portal' },
    },
    outputSize: {
        control: { type: 'number', min: 0, max: 2048, step: 64 },
        description: 'Output size in pixels (0 = original selection size)',
        table: { category: 'Output' },
    },
    compression: {
        control: { type: 'range', min: 0, max: 1, step: 0.1 },
        description: 'JPEG compression (0-1)',
        table: { category: 'Output' },
    },
    type: {
        control: 'inline-radio',
        options: ['jpeg', 'png'],
        description: 'Output image format',
        table: { category: 'Output' },
    },
    applyButtonLabel: {
        control: 'text',
        description: 'Apply button text',
        table: { category: 'Labels' },
    },
    cancelButtonLabel: {
        control: 'text',
        description: 'Cancel button text',
        table: { category: 'Labels' },
    },
    maxFileSize: {
        control: { type: 'number', min: 0, step: 1024 * 1024 },
        description: 'Max file size in bytes (0 = no limit)',
        table: { category: 'Validation' },
    },
}
