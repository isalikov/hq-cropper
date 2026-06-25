import type { Meta, StoryObj } from '@storybook/html-vite'
import {
    createCropperStory,
    defaultArgs,
    defaultArgTypes,
    type StoryArgs,
} from './shared'

const meta: Meta<StoryArgs> = {
    title: 'HqCropper/Default',
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
 * Default configuration with all standard settings.
 * Use the controls panel to experiment with different options.
 */
export const Default: Story = {}
