import type { Meta, StoryObj } from '@storybook/html-vite'
import {
    createCropperStory,
    defaultArgs,
    defaultArgTypes,
    type StoryArgs,
} from './shared'

const meta: Meta<StoryArgs> = {
    title: 'HqCropper/Validation',
    render: (args) => createCropperStory(args),
    parameters: {
        layout: 'padded',
    },
    argTypes: defaultArgTypes,
    args: defaultArgs,
}

export default meta
type Story = StoryObj<StoryArgs>

/**
 * File size restriction (max 2MB).
 * Will show error if user selects a file larger than 2MB.
 */
export const MaxFileSize2MB: Story = {
    args: {
        description:
            'Maximum file size limited to 2MB. Try uploading a large file to see the error.',
        maxFileSize: 2 * 1024 * 1024,
    },
}

/**
 * Custom button labels for localization.
 * Example with Russian labels.
 */
export const RussianLabels: Story = {
    args: {
        description: 'Custom Russian button labels',
        applyButtonLabel: 'Применить',
        cancelButtonLabel: 'Отмена',
    },
}

/**
 * Custom button labels - German example.
 */
export const GermanLabels: Story = {
    args: {
        description: 'Custom German button labels',
        applyButtonLabel: 'Anwenden',
        cancelButtonLabel: 'Abbrechen',
    },
}
