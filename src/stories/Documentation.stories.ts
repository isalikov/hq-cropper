import type { Meta, StoryObj } from '@storybook/html'

const meta: Meta = {
    title: 'Documentation',
    parameters: {
        layout: 'padded',
    },
}

export default meta
type Story = StoryObj

const createDocumentation = (): HTMLElement => {
    const container = document.createElement('div')
    container.style.cssText = `
        max-width: 800px;
        margin: 0 auto;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #333;
    `

    container.innerHTML = `
        <style>
            .doc-h1 { font-size: 2.5em; margin-bottom: 0.5em; color: #1a1a1a; }
            .doc-h2 { font-size: 1.8em; margin-top: 2em; margin-bottom: 0.5em; color: #1a1a1a; border-bottom: 2px solid #eee; padding-bottom: 0.3em; }
            .doc-h3 { font-size: 1.3em; margin-top: 1.5em; margin-bottom: 0.5em; color: #333; }
            .doc-p { margin: 1em 0; }
            .doc-code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; font-family: 'Monaco', 'Menlo', monospace; font-size: 0.9em; }
            .doc-pre { background: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 0.85em; line-height: 1.5; }
            .doc-table { width: 100%; border-collapse: collapse; margin: 1em 0; font-size: 0.9em; }
            .doc-table th { background: #f8fafc; text-align: left; padding: 12px; border-bottom: 2px solid #e2e8f0; }
            .doc-table td { padding: 12px; border-bottom: 1px solid #e2e8f0; }
            .doc-table tr:hover { background: #f8fafc; }
            .doc-badge { display: inline-block; background: #10b981; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; margin-right: 8px; }
            .doc-list { margin: 1em 0; padding-left: 1.5em; }
            .doc-list li { margin: 0.5em 0; }
        </style>

        <h1 class="doc-h1">HQ-Cropper Documentation</h1>
        <p class="doc-p">
            <span class="doc-badge">Zero Dependencies</span>
            <span class="doc-badge">TypeScript</span>
            <span class="doc-badge">Mobile Support</span>
        </p>
        <p class="doc-p">A lightweight image cropper for high-quality square crops. Perfect for profile pictures, avatars, and thumbnails.</p>

        <h2 class="doc-h2">Installation</h2>
        <pre class="doc-pre">npm install hq-cropper
# or
pnpm add hq-cropper
# or
yarn add hq-cropper</pre>

        <h2 class="doc-h2">Quick Start</h2>
        <pre class="doc-pre">import { HqCropper } from 'hq-cropper'

const cropper = HqCropper((base64, blob, state) => {
    console.log('Cropped image:', base64)
    console.log('Blob:', blob)
    console.log('Original file:', state.fileName)
})

// Open file picker
document.querySelector('#crop-button').addEventListener('click', () => {
    cropper.open()
})</pre>

        <h2 class="doc-h2">API Reference</h2>
        <h3 class="doc-h3">HqCropper(onSubmit, config?, css?, onError?)</h3>
        <p class="doc-p">Creates a new cropper instance.</p>
        <pre class="doc-pre">const cropper = HqCropper(
    onSubmit,  // Required: callback with result
    config,    // Optional: configuration options
    css,       // Optional: custom CSS class names
    onError    // Optional: error handler
)</pre>

        <table class="doc-table">
            <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code class="doc-code">onSubmit</code></td>
                    <td><code class="doc-code">(base64, blob, state) => void</code></td>
                    <td>Called when user applies the crop</td>
                </tr>
                <tr>
                    <td><code class="doc-code">config</code></td>
                    <td><code class="doc-code">Partial&lt;ConfigurationOptions&gt;</code></td>
                    <td>Configuration options</td>
                </tr>
                <tr>
                    <td><code class="doc-code">css</code></td>
                    <td><code class="doc-code">Partial&lt;ClassNames&gt;</code></td>
                    <td>Custom CSS class names</td>
                </tr>
                <tr>
                    <td><code class="doc-code">onError</code></td>
                    <td><code class="doc-code">(message) => void</code></td>
                    <td>Called on validation or processing errors</td>
                </tr>
            </tbody>
        </table>

        <h2 class="doc-h2">Configuration Options</h2>

        <h3 class="doc-h3">Portal Settings</h3>
        <table class="doc-table">
            <thead>
                <tr><th>Option</th><th>Type</th><th>Default</th><th>Description</th></tr>
            </thead>
            <tbody>
                <tr><td><code class="doc-code">portalSize</code></td><td>number</td><td>150</td><td>Initial size of crop portal in pixels</td></tr>
                <tr><td><code class="doc-code">minPortalSize</code></td><td>number</td><td>50</td><td>Minimum portal size</td></tr>
                <tr><td><code class="doc-code">portalPosition</code></td><td>[number, number] | 'center'</td><td>'center'</td><td>Initial portal position</td></tr>
                <tr><td><code class="doc-code">framePadding</code></td><td>number</td><td>3</td><td>Padding around the image frame</td></tr>
            </tbody>
        </table>

        <h3 class="doc-h3">Output Settings</h3>
        <table class="doc-table">
            <thead>
                <tr><th>Option</th><th>Type</th><th>Default</th><th>Description</th></tr>
            </thead>
            <tbody>
                <tr><td><code class="doc-code">outputSize</code></td><td>number</td><td>0</td><td>Output size in pixels (0 = original selection size)</td></tr>
                <tr><td><code class="doc-code">compression</code></td><td>number</td><td>1</td><td>JPEG compression quality (0-1)</td></tr>
                <tr><td><code class="doc-code">type</code></td><td>'jpeg' | 'png'</td><td>'jpeg'</td><td>Output image format</td></tr>
            </tbody>
        </table>

        <h3 class="doc-h3">Validation Settings</h3>
        <table class="doc-table">
            <thead>
                <tr><th>Option</th><th>Type</th><th>Default</th><th>Description</th></tr>
            </thead>
            <tbody>
                <tr><td><code class="doc-code">maxFileSize</code></td><td>number</td><td>0</td><td>Max file size in bytes (0 = no limit)</td></tr>
                <tr><td><code class="doc-code">allowedTypes</code></td><td>string[]</td><td>['image/jpeg', ...]</td><td>Allowed MIME types</td></tr>
            </tbody>
        </table>

        <h3 class="doc-h3">UI Labels</h3>
        <table class="doc-table">
            <thead>
                <tr><th>Option</th><th>Type</th><th>Default</th><th>Description</th></tr>
            </thead>
            <tbody>
                <tr><td><code class="doc-code">applyButtonLabel</code></td><td>string</td><td>'Apply'</td><td>Apply button text</td></tr>
                <tr><td><code class="doc-code">cancelButtonLabel</code></td><td>string</td><td>'Cancel'</td><td>Cancel button text</td></tr>
            </tbody>
        </table>

        <h2 class="doc-h2">Custom Styling (CSS)</h2>
        <p class="doc-p">You can fully customize the appearance by providing custom CSS class names:</p>
        <pre class="doc-pre">const cropper = HqCropper(
    onSubmit,
    {},  // config
    {
        root: ['my-overlay'],
        container: ['my-modal'],
        header: ['my-header'],
        body: ['my-body'],
        footer: ['my-footer'],
        portal: ['my-crop-area'],
        applyButton: ['btn', 'btn-primary'],
        cancelButton: ['btn', 'btn-secondary'],
    }
)</pre>

        <h3 class="doc-h3">Available CSS Class Overrides</h3>
        <table class="doc-table">
            <thead>
                <tr><th>Property</th><th>Element</th><th>Description</th></tr>
            </thead>
            <tbody>
                <tr><td><code class="doc-code">root</code></td><td>Overlay</td><td>Full-screen backdrop</td></tr>
                <tr><td><code class="doc-code">container</code></td><td>Modal</td><td>Main modal wrapper</td></tr>
                <tr><td><code class="doc-code">header</code></td><td>Header</td><td>Contains filename</td></tr>
                <tr><td><code class="doc-code">body</code></td><td>Body</td><td>Image and crop portal area</td></tr>
                <tr><td><code class="doc-code">footer</code></td><td>Footer</td><td>Action buttons</td></tr>
                <tr><td><code class="doc-code">portal</code></td><td>Crop area</td><td>Draggable/resizable selection</td></tr>
                <tr><td><code class="doc-code">portalArea</code></td><td>Portal container</td><td>Portal movement area</td></tr>
                <tr><td><code class="doc-code">sourceImage</code></td><td>Image</td><td>Source image being cropped</td></tr>
                <tr><td><code class="doc-code">preview</code></td><td>Preview</td><td>Live preview container</td></tr>
                <tr><td><code class="doc-code">previewImage</code></td><td>Preview image</td><td>Image inside preview</td></tr>
                <tr><td><code class="doc-code">applyButton</code></td><td>Apply button</td><td>Confirm crop button</td></tr>
                <tr><td><code class="doc-code">cancelButton</code></td><td>Cancel button</td><td>Close/cancel button</td></tr>
                <tr><td><code class="doc-code">handlerMove</code></td><td>Move handle</td><td>Central drag handle</td></tr>
                <tr><td><code class="doc-code">handlerResizeTopLeft</code></td><td>Resize handle</td><td>Top-left corner</td></tr>
                <tr><td><code class="doc-code">handlerResizeTopRight</code></td><td>Resize handle</td><td>Top-right corner</td></tr>
                <tr><td><code class="doc-code">handlerResizeBottomLeft</code></td><td>Resize handle</td><td>Bottom-left corner</td></tr>
                <tr><td><code class="doc-code">handlerResizeBottomRight</code></td><td>Resize handle</td><td>Bottom-right corner</td></tr>
            </tbody>
        </table>

        <h2 class="doc-h2">TypeScript Support</h2>
        <p class="doc-p">Full TypeScript support with exported types:</p>
        <pre class="doc-pre">import {
    HqCropper,
    type HqCropperInstance,
    type ConfigurationOptions,
    type ClassNames,
    type ApplicationState,
    type ErrorHandler,
} from 'hq-cropper'</pre>

        <h2 class="doc-h2">Framework Examples</h2>

        <h3 class="doc-h3">React</h3>
        <pre class="doc-pre">import { useRef, useState } from 'react'
import { HqCropper } from 'hq-cropper'

function AvatarUpload() {
    const [avatar, setAvatar] = useState('')

    const cropperRef = useRef(
        HqCropper(
            (base64) => setAvatar(base64),
            { outputSize: 256 }
        )
    )

    return (
        &lt;div&gt;
            {avatar && &lt;img src={avatar} alt="Avatar" /&gt;}
            &lt;button onClick={() => cropperRef.current.open()}&gt;
                Upload Avatar
            &lt;/button&gt;
        &lt;/div&gt;
    )
}</pre>

        <h3 class="doc-h3">Vue 3</h3>
        <pre class="doc-pre">&lt;script setup lang="ts"&gt;
import { ref, onMounted } from 'vue'
import { HqCropper, type HqCropperInstance } from 'hq-cropper'

const avatar = ref('')
let cropper: HqCropperInstance

onMounted(() => {
    cropper = HqCropper((base64) => {
        avatar.value = base64
    }, { outputSize: 256 })
})
&lt;/script&gt;

&lt;template&gt;
    &lt;div&gt;
        &lt;img v-if="avatar" :src="avatar" alt="Avatar" /&gt;
        &lt;button @click="cropper.open()"&gt;Upload Avatar&lt;/button&gt;
    &lt;/div&gt;
&lt;/template&gt;</pre>

        <h2 class="doc-h2">Fonts</h2>
        <p class="doc-p">
            <strong>HQ-Cropper does not define any font-family.</strong> The cropper inherits the font from your application's CSS.
            This means the cropper will automatically use whatever font is defined in your app's <code class="doc-code">body</code> or root element.
        </p>
        <p class="doc-p">This design choice ensures that:</p>
        <ul class="doc-list">
            <li>The cropper seamlessly integrates with your application's design system</li>
            <li>No font conflicts or overrides occur</li>
            <li>Your branding and typography remain consistent</li>
        </ul>
        <h3 class="doc-h3">Example: Setting a Font</h3>
        <pre class="doc-pre">/* In your application's CSS */
body {
    font-family: Inter, -apple-system, BlinkMacSystemFont,
                 'Segoe UI', Roboto, sans-serif;
}

/* The cropper will automatically inherit this font */</pre>
        <p class="doc-p">
            If you need to override the font specifically for the cropper, you can use the CSS customization API:
        </p>
        <pre class="doc-pre">.my-cropper-container {
    font-family: 'Custom Font', sans-serif;
}

const cropper = HqCropper(onSubmit, {}, {
    container: ['my-cropper-container']
})</pre>

        <h2 class="doc-h2">Mobile Support</h2>
        <p class="doc-p">HQ-Cropper has full mobile support:</p>
        <ul class="doc-list">
            <li>Touch events (<code class="doc-code">touchstart</code>, <code class="doc-code">touchmove</code>, <code class="doc-code">touchend</code>)</li>
            <li>Responsive layout for screens under 540px</li>
            <li>Larger touch targets (24px) for resize handles on mobile</li>
            <li>Proper viewport handling with <code class="doc-code">100dvh</code></li>
            <li><code class="doc-code">touch-action: none</code> to prevent scroll during interactions</li>
        </ul>

        <h2 class="doc-h2">Browser Support</h2>
        <ul class="doc-list">
            <li>ES2020+ browsers</li>
            <li>Canvas API</li>
            <li>FileReader API</li>
            <li>Touch events (mobile)</li>
        </ul>
    `

    return container
}

export const GettingStarted: Story = {
    render: () => createDocumentation(),
}
