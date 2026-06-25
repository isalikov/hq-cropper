import type { Meta, StoryObj } from '@storybook/html-vite'
import {
    createCropperStory,
    defaultArgs,
    defaultArgTypes,
    type StoryArgs,
} from './shared'

const meta: Meta<StoryArgs> = {
    title: 'HqCropper/Output',
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
 * Fixed output size with PNG format.
 * Always outputs 512x512px PNG image regardless of selection size.
 */
export const FixedOutputPNG: Story = {
    args: {
        description: 'PNG output with fixed 512x512px size',
        type: 'png',
        outputSize: 512,
        compression: 1,
    },
}

/**
 * Compressed JPEG output for smaller file size.
 * Uses 70% compression for smaller files with good quality.
 */
export const CompressedJPEG: Story = {
    args: {
        description: 'Compressed JPEG output (256px, 70% compression)',
        type: 'jpeg',
        outputSize: 256,
        compression: 0.7,
    },
}

/**
 * Original selection size output.
 * Outputs the exact size of the selected area without scaling.
 */
export const OriginalSize: Story = {
    args: {
        description: 'Output matches selection size (outputSize: 0)',
        outputSize: 0,
        compression: 1,
    },
}
