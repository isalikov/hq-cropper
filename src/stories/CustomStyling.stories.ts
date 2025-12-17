import type { Meta, StoryObj } from '@storybook/html'
import { HqCropper } from '../index'
import type { ApplicationState } from '../types'
import { defaultArgs, defaultArgTypes, type StoryArgs } from './shared'

const meta: Meta<StoryArgs> = {
    title: 'HqCropper/Custom Styling',
    parameters: {
        layout: 'padded',
    },
    argTypes: defaultArgTypes,
    args: defaultArgs,
}

export default meta
type Story = StoryObj<StoryArgs>

/**
 * Custom CSS styling example with gradient header and custom buttons.
 * Shows how to fully customize the cropper appearance.
 */
export const GradientTheme: Story = {
    args: {
        description:
            'Custom styled cropper with gradient header and custom buttons',
    },
    render: (args) => {
        const container = document.createElement('div')
        container.style.padding = '20px'

        const style = document.createElement('style')
        style.textContent = `
            .custom-root {
                background: rgba(15, 23, 42, 0.9);
            }
            .custom-container {
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }
            .custom-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                font-weight: 600;
            }
            .custom-body {
                background: #1e293b;
            }
            .custom-footer {
                background: #f8fafc;
                border-top: 1px solid #e2e8f0;
            }
            .custom-apply {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                border: none;
                border-radius: 8px;
                padding: 10px 24px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.1s, box-shadow 0.1s;
            }
            .custom-apply:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
            }
            .custom-cancel {
                background: white;
                color: #64748b;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                padding: 10px 24px;
                font-weight: 600;
                cursor: pointer;
                transition: border-color 0.1s;
            }
            .custom-cancel:hover {
                border-color: #cbd5e1;
            }
            .custom-portal {
                border: 3px dashed #10b981 !important;
            }
        `
        document.head.appendChild(style)

        const description = document.createElement('p')
        description.textContent = args.description
        description.style.marginBottom = '16px'
        description.style.color = '#666'
        container.appendChild(description)

        const codeBlock = document.createElement('pre')
        codeBlock.style.cssText = `
            background: #1e293b;
            color: #e2e8f0;
            padding: 16px;
            border-radius: 8px;
            font-size: 12px;
            overflow-x: auto;
            margin-bottom: 20px;
        `
        codeBlock.textContent = `const cropper = HqCropper(
    onSubmit,
    { outputSize: 256 },
    {
        root: ['custom-root'],
        container: ['custom-container'],
        header: ['custom-header'],
        body: ['custom-body'],
        footer: ['custom-footer'],
        applyButton: ['custom-apply'],
        cancelButton: ['custom-cancel'],
        portal: ['custom-portal'],
    }
)`
        container.appendChild(codeBlock)

        const button = document.createElement('button')
        button.textContent = 'Open Custom Styled Cropper'
        button.style.cssText = `
            padding: 12px 24px;
            font-size: 16px;
            cursor: pointer;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
        `
        container.appendChild(button)

        const resultContainer = document.createElement('div')
        resultContainer.style.marginTop = '20px'
        container.appendChild(resultContainer)

        const cropper = HqCropper(
            (base64: string, blob: Blob | null, state: ApplicationState) => {
                resultContainer.innerHTML = ''

                const img = document.createElement('img')
                img.src = base64
                img.style.cssText = `
                    max-width: 300px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                `
                resultContainer.appendChild(img)

                const info = document.createElement('div')
                info.style.cssText =
                    'margin-top: 12px; font-size: 14px; color: #666;'
                info.innerHTML = `
                    <p><strong>File:</strong> ${state.fileName}</p>
                    <p><strong>Blob size:</strong> ${blob ? (blob.size / 1024).toFixed(2) + ' KB' : 'N/A'}</p>
                `
                resultContainer.appendChild(info)
            },
            { outputSize: 256 },
            {
                root: ['custom-root'],
                container: ['custom-container'],
                header: ['custom-header'],
                body: ['custom-body'],
                footer: ['custom-footer'],
                applyButton: ['custom-apply'],
                cancelButton: ['custom-cancel'],
                portal: ['custom-portal'],
            },
            (message: string) => {
                resultContainer.innerHTML = `<p style="color: red;">Error: ${message}</p>`
            }
        )

        button.addEventListener('click', () => cropper.open())

        return container
    },
}

/**
 * Dark theme example.
 * A fully dark themed cropper for dark mode applications.
 */
export const DarkTheme: Story = {
    args: {
        description: 'Dark themed cropper',
    },
    render: (args) => {
        const container = document.createElement('div')
        container.style.padding = '20px'

        const style = document.createElement('style')
        style.textContent = `
            .dark-root {
                background: rgba(0, 0, 0, 0.95);
            }
            .dark-container {
                background: #18181b;
                border: 1px solid #27272a;
                border-radius: 12px;
            }
            .dark-header {
                background: #18181b;
                color: #fafafa;
                border-bottom: 1px solid #27272a;
            }
            .dark-body {
                background: #09090b;
            }
            .dark-footer {
                background: #18181b;
                border-top: 1px solid #27272a;
            }
            .dark-apply {
                background: #3b82f6;
                color: white;
                border: none;
                border-radius: 6px;
                padding: 8px 16px;
                font-weight: 500;
                cursor: pointer;
            }
            .dark-apply:hover {
                background: #2563eb;
            }
            .dark-cancel {
                background: #27272a;
                color: #a1a1aa;
                border: none;
                border-radius: 6px;
                padding: 8px 16px;
                font-weight: 500;
                cursor: pointer;
            }
            .dark-cancel:hover {
                background: #3f3f46;
            }
        `
        document.head.appendChild(style)

        const description = document.createElement('p')
        description.textContent = args.description
        description.style.marginBottom = '16px'
        description.style.color = '#666'
        container.appendChild(description)

        const button = document.createElement('button')
        button.textContent = 'Open Dark Theme Cropper'
        button.style.cssText = `
            padding: 12px 24px;
            font-size: 16px;
            cursor: pointer;
            background: #18181b;
            color: #fafafa;
            border: 1px solid #27272a;
            border-radius: 8px;
        `
        container.appendChild(button)

        const resultContainer = document.createElement('div')
        resultContainer.style.marginTop = '20px'
        container.appendChild(resultContainer)

        const cropper = HqCropper(
            (base64: string, blob: Blob | null, state: ApplicationState) => {
                resultContainer.innerHTML = ''

                const img = document.createElement('img')
                img.src = base64
                img.style.cssText = `
                    max-width: 300px;
                    border: 1px solid #27272a;
                    border-radius: 8px;
                `
                resultContainer.appendChild(img)

                const info = document.createElement('div')
                info.style.cssText =
                    'margin-top: 12px; font-size: 14px; color: #666;'
                info.innerHTML = `
                    <p><strong>File:</strong> ${state.fileName}</p>
                    <p><strong>Blob size:</strong> ${blob ? (blob.size / 1024).toFixed(2) + ' KB' : 'N/A'}</p>
                `
                resultContainer.appendChild(info)
            },
            {},
            {
                root: ['dark-root'],
                container: ['dark-container'],
                header: ['dark-header'],
                body: ['dark-body'],
                footer: ['dark-footer'],
                applyButton: ['dark-apply'],
                cancelButton: ['dark-cancel'],
            },
            (message: string) => {
                resultContainer.innerHTML = `<p style="color: red;">Error: ${message}</p>`
            }
        )

        button.addEventListener('click', () => cropper.open())

        return container
    },
}

/**
 * Minimal light theme.
 * Clean and simple styling for minimal interfaces.
 */
export const MinimalLight: Story = {
    args: {
        description: 'Minimal light themed cropper',
    },
    render: (args) => {
        const container = document.createElement('div')
        container.style.padding = '20px'

        const style = document.createElement('style')
        style.textContent = `
            .minimal-root {
                background: rgba(255, 255, 255, 0.95);
            }
            .minimal-container {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            .minimal-header {
                background: white;
                color: #111827;
                border-bottom: 1px solid #e5e7eb;
                font-weight: 500;
            }
            .minimal-body {
                background: #f9fafb;
            }
            .minimal-footer {
                background: white;
                border-top: 1px solid #e5e7eb;
            }
            .minimal-apply {
                background: #111827;
                color: white;
                border: none;
                border-radius: 6px;
                padding: 8px 16px;
                font-weight: 500;
                cursor: pointer;
            }
            .minimal-apply:hover {
                background: #1f2937;
            }
            .minimal-cancel {
                background: white;
                color: #6b7280;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                padding: 8px 16px;
                font-weight: 500;
                cursor: pointer;
            }
            .minimal-cancel:hover {
                background: #f9fafb;
            }
        `
        document.head.appendChild(style)

        const description = document.createElement('p')
        description.textContent = args.description
        description.style.marginBottom = '16px'
        description.style.color = '#666'
        container.appendChild(description)

        const button = document.createElement('button')
        button.textContent = 'Open Minimal Cropper'
        button.style.cssText = `
            padding: 12px 24px;
            font-size: 16px;
            cursor: pointer;
            background: #111827;
            color: white;
            border: none;
            border-radius: 6px;
        `
        container.appendChild(button)

        const resultContainer = document.createElement('div')
        resultContainer.style.marginTop = '20px'
        container.appendChild(resultContainer)

        const cropper = HqCropper(
            (base64: string, blob: Blob | null, state: ApplicationState) => {
                resultContainer.innerHTML = ''

                const img = document.createElement('img')
                img.src = base64
                img.style.cssText = `
                    max-width: 300px;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                `
                resultContainer.appendChild(img)

                const info = document.createElement('div')
                info.style.cssText =
                    'margin-top: 12px; font-size: 14px; color: #666;'
                info.innerHTML = `
                    <p><strong>File:</strong> ${state.fileName}</p>
                    <p><strong>Blob size:</strong> ${blob ? (blob.size / 1024).toFixed(2) + ' KB' : 'N/A'}</p>
                `
                resultContainer.appendChild(info)
            },
            {},
            {
                root: ['minimal-root'],
                container: ['minimal-container'],
                header: ['minimal-header'],
                body: ['minimal-body'],
                footer: ['minimal-footer'],
                applyButton: ['minimal-apply'],
                cancelButton: ['minimal-cancel'],
            },
            (message: string) => {
                resultContainer.innerHTML = `<p style="color: red;">Error: ${message}</p>`
            }
        )

        button.addEventListener('click', () => cropper.open())

        return container
    },
}
