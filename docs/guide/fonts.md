# Fonts

HQ-Cropper is designed to seamlessly integrate with your application's design system.

## Font Inheritance

**HQ-Cropper does not define any `font-family`.** The cropper automatically inherits fonts from your application's CSS.

This means:

- No font conflicts or overrides
- Consistent typography with your app
- No extra font downloads

## How It Works

```css
/* Your application's CSS */
body {
    font-family:
        Inter,
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        sans-serif;
}

/* HQ-Cropper will automatically use Inter */
```

The cropper modal renders inside your document's `<body>`, so it inherits whatever font styles you've defined.

## Overriding Fonts

If you need a different font specifically for the cropper, use the CSS customization API:

```css
.my-cropper {
    font-family: 'Roboto Mono', monospace;
}
```

```typescript
const cropper = HqCropper(
    onSubmit,
    {},
    {
        container: ['my-cropper'],
    }
)
```

## Best Practices

::: tip Use System Fonts
For the best performance and native feel, consider using a system font stack:

```css
body {
    font-family:
        -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
        sans-serif;
}
```

:::

::: warning Web Fonts
If you're using web fonts (Google Fonts, Adobe Fonts, etc.), make sure they're loaded before the cropper opens. Otherwise, the cropper may initially render with a fallback font.
:::
