import type { Meta } from '@storybook/html-vite'
import { HqCropper } from '../index'
import type { ApplicationState, ResultImageType } from '../types'

export interface StoryArgs {
    description: string
    portalSize: number
    minPortalSize: number
    lockAspectRatio: boolean
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
    description.style.marginBottom = '8px'
    description.style.color = '#666'
    container.appendChild(description)

    const hint = document.createElement('p')
    hint.innerHTML = args.lockAspectRatio
        ? '🔒 <strong>Square (1:1)</strong> — every corner keeps the portal a perfect square.'
        : '⬌ <strong>Free rectangle</strong> — drag any corner to resize width and height independently.'
    hint.style.cssText =
        'margin: 0 0 16px; font-size: 13px; color: #0f766e; background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 6px; padding: 8px 12px; display: inline-block;'
    container.appendChild(hint)

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
        (base64: string, blob: Blob | null, state: ApplicationState) => {
            resultContainer.innerHTML = ''

            const selectionWidth = Math.round(state.portal.width)
            const selectionHeight = Math.round(state.portal.height)
            const selectionRatio = (
                state.portal.width / state.portal.height
            ).toFixed(2)

            const img = document.createElement('img')
            img.src = base64
            // Checkerboard backdrop makes transparent PNG corners obvious.
            img.style.cssText = `
                max-width: 300px;
                border: 1px solid #ddd;
                border-radius: 4px;
                background-image: linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%);
                background-size: 16px 16px;
                background-position: 0 0, 0 8px, 8px -8px, -8px 0;
            `
            resultContainer.appendChild(img)

            const info = document.createElement('div')
            info.style.cssText =
                'margin-top: 12px; font-size: 14px; color: #666;'

            const renderInfo = (outputDimensions: string) => {
                info.innerHTML = `
                <p><strong>Shape:</strong> ${args.lockAspectRatio ? 'Square (locked 1:1)' : 'Free rectangle'}</p>
                <p><strong>File:</strong> ${state.fileName}</p>
                <p><strong>Original:</strong> ${state.sourceWidth} × ${state.sourceHeight}px</p>
                <p><strong>Selection:</strong> ${selectionWidth} × ${selectionHeight}px (ratio ${selectionRatio}:1)</p>
                <p><strong>Output:</strong> ${outputDimensions}</p>
                <p><strong>Blob size:</strong> ${blob ? (blob.size / 1024).toFixed(2) + ' KB' : 'N/A'}</p>
            `
            }

            renderInfo('measuring…')
            // Read the real pixel dimensions of the produced image once decoded —
            // the clearest proof that rectangle crops keep their aspect ratio.
            img.addEventListener('load', () =>
                renderInfo(`${img.naturalWidth} × ${img.naturalHeight}px`)
            )
            resultContainer.appendChild(info)
        },
        {
            portalSize: args.portalSize,
            minPortalSize: args.minPortalSize,
            lockAspectRatio: args.lockAspectRatio,
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
    lockAspectRatio: true,
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
    lockAspectRatio: {
        control: 'boolean',
        description:
            'Lock the portal to a square (1:1). Disable for free rectangle crops',
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
