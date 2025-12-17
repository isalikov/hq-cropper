import type { Meta, StoryObj } from '@storybook/html'
import {
    createCropperStory,
    defaultArgs,
    defaultArgTypes,
    type StoryArgs,
} from './shared'

const meta: Meta<StoryArgs> = {
    title: 'HqCropper/Portal',
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
 * Small portal size for precise cropping.
 * Useful when you need to select a small area from a large image.
 */
export const SmallPortal: Story = {
    args: {
        description: 'Small portal (80px) with minimum size 30px',
        portalSize: 80,
        minPortalSize: 30,
    },
}

/**
 * Large portal size for quick cropping.
 * Good for selecting larger areas quickly.
 */
export const LargePortal: Story = {
    args: {
        description: 'Large portal (250px) for quick selection',
        portalSize: 250,
    },
}

/**
 * Larger frame padding for better UX.
 * Adds more space around the image frame for easier interaction.
 */
export const LargeFramePadding: Story = {
    args: {
        description: 'Larger frame padding (20px) for easier edge interaction',
        framePadding: 20,
    },
}
