# Custom Styling

HQ-Cropper allows you to fully customize the appearance by providing custom CSS class names.

## CSS Class Overrides

Pass custom classes as the third parameter:

```typescript
const cropper = HqCropper(
    onSubmit,
    {}, // config
    {
        root: ['my-overlay'],
        container: ['my-modal'],
        header: ['my-header'],
        body: ['my-body'],
        footer: ['my-footer'],
        portal: ['my-portal'],
        applyButton: ['btn', 'btn-primary'],
        cancelButton: ['btn', 'btn-secondary'],
    }
)
```

## Available Classes

| Property                   | Element          | Description          |
| -------------------------- | ---------------- | -------------------- |
| `root`                     | Overlay          | Full-screen backdrop |
| `container`                | Modal            | Main modal wrapper   |
| `header`                   | Header           | Contains filename    |
| `body`                     | Body             | Image and crop area  |
| `footer`                   | Footer           | Action buttons       |
| `portal`                   | Crop area        | Draggable selection  |
| `portalArea`               | Portal container | Movement boundary    |
| `sourceImage`              | Image            | Source image         |
| `preview`                  | Preview          | Preview container    |
| `previewImage`             | Preview image    | Image in preview     |
| `applyButton`              | Button           | Confirm crop         |
| `cancelButton`             | Button           | Cancel/close         |
| `handlerMove`              | Handle           | Central drag handle  |
| `handlerResizeTopLeft`     | Handle           | Top-left resize      |
| `handlerResizeTopRight`    | Handle           | Top-right resize     |
| `handlerResizeBottomLeft`  | Handle           | Bottom-left resize   |
| `handlerResizeBottomRight` | Handle           | Bottom-right resize  |

## Example: Dark Theme

```css
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
}

.dark-cancel {
    background: #27272a;
    color: #a1a1aa;
    border: none;
    border-radius: 6px;
    padding: 8px 16px;
}
```

```typescript
const cropper = HqCropper(
    onSubmit,
    {},
    {
        root: ['dark-root'],
        container: ['dark-container'],
        header: ['dark-header'],
        body: ['dark-body'],
        footer: ['dark-footer'],
        applyButton: ['dark-apply'],
        cancelButton: ['dark-cancel'],
    }
)
```

## Example: Gradient Theme

```css
.gradient-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 600;
}

.gradient-apply {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 24px;
    font-weight: 600;
    transition: transform 0.1s;
}

.gradient-apply:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}
```

## Using with CSS Frameworks

### Tailwind CSS

```typescript
const cropper = HqCropper(
    onSubmit,
    {},
    {
        applyButton: ['bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded'],
        cancelButton: [
            'bg-gray-200',
            'text-gray-700',
            'px-4',
            'py-2',
            'rounded',
        ],
    }
)
```

### Bootstrap

```typescript
const cropper = HqCropper(
    onSubmit,
    {},
    {
        applyButton: ['btn', 'btn-primary'],
        cancelButton: ['btn', 'btn-secondary'],
    }
)
```

::: tip
Check out the [Storybook demo](/storybook/) for more styling examples including GradientTheme, DarkTheme, and MinimalLight.
:::
