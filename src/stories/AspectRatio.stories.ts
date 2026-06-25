import type { Meta, StoryObj } from '@storybook/html-vite'
import {
    createCropperStory,
    defaultArgs,
    defaultArgTypes,
    type StoryArgs,
} from './shared'

const meta: Meta<StoryArgs> = {
    title: 'HqCropper/Aspect Ratio',
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
 * Default behaviour: the portal is locked to a 1:1 square.
 * No matter which corner you drag, width always equals height — ideal for
 * avatars, profile pictures and thumbnails.
 */
export const SquareLocked: Story = {
    args: {
        description: 'Locked square crop (lockAspectRatio: true) — the default',
        lockAspectRatio: true,
        portalSize: 180,
    },
}

/**
 * Free rectangle crop. Set `lockAspectRatio: false` and each corner resizes
 * width and height independently, so you can produce any rectangle.
 * The opposite corner stays anchored while you drag.
 */
export const FreeRectangle: Story = {
    args: {
        description:
            'Free rectangle crop (lockAspectRatio: false) — drag any corner to reshape',
        lockAspectRatio: false,
        portalSize: 180,
    },
}

/**
 * Free rectangle exported at a fixed resolution. `outputSize` caps the longest
 * side (here 1024px) while the shorter side scales proportionally, so the
 * selected aspect ratio is preserved in the output file.
 */
export const FreeRectangleHiRes: Story = {
    args: {
        description:
            'Free rectangle scaled so its longest side is 1024px (PNG, ratio preserved)',
        lockAspectRatio: false,
        portalSize: 180,
        outputSize: 1024,
        type: 'png',
        compression: 1,
    },
}

/**
 * Free rectangle at native resolution. With `outputSize: 0` the output keeps
 * the exact pixel dimensions of the selected region from the source image.
 */
export const FreeRectangleOriginal: Story = {
    args: {
        description: 'Free rectangle at native selection size (outputSize: 0)',
        lockAspectRatio: false,
        portalSize: 200,
        outputSize: 0,
    },
}

/**
 * A larger minimum size combined with free resizing. Useful when you want
 * rectangles but never smaller than a usable area on either axis.
 */
export const FreeRectangleWithMinSize: Story = {
    args: {
        description:
            'Free rectangle that can never shrink below 120px on either side',
        lockAspectRatio: false,
        portalSize: 220,
        minPortalSize: 120,
    },
}
