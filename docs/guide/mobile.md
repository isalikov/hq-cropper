# Mobile Support

HQ-Cropper has full mobile support out of the box. No additional configuration needed.

## Touch Events

The cropper supports all touch interactions:

- **Touch drag** — move the crop portal
- **Touch resize** — resize from corners
- **Pinch-free** — prevents accidental zoom while cropping

## Responsive Layout

On screens under 540px:

- Modal adapts to screen size
- Larger touch targets (24px) for resize handles
- Proper viewport handling with `100dvh`

## Touch Targets

Resize handles automatically increase in size on touch devices:

| Device       | Handle Size |
| ------------ | ----------- |
| Desktop      | 5px         |
| Mobile/Touch | 24px        |

This ensures comfortable interaction on phones and tablets.

## Viewport Handling

The cropper uses modern CSS for proper mobile viewport:

```css
/* Handles iOS Safari toolbar */
height: 100dvh;

/* Prevents body scroll */
position: fixed;

/* Prevents scroll during drag */
touch-action: none;
```

## Testing Mobile

To test mobile behavior:

1. Open browser DevTools
2. Toggle device toolbar (Cmd+Shift+M or Ctrl+Shift+M)
3. Select a mobile device (e.g., iPhone 12)
4. Interact with the cropper

::: tip
The [Storybook demo](/storybook/) works on mobile devices — try it on your phone!
:::

## Known Limitations

- **iOS Safari**: Double-tap zoom is disabled while cropping
- **Android Chrome**: Overscroll effect is prevented during drag

These are intentional behaviors to ensure smooth cropping experience.
