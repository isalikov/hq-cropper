---
layout: home

hero:
    name: HQ-Cropper
    text: Image Cropper for High-Quality Square Crops
    tagline: Lightweight, zero-dependency, mobile-friendly
    actions:
        - theme: brand
          text: Get Started
          link: /guide/getting-started
        - theme: alt
          text: Live Demo
          link: /storybook/
        - theme: alt
          text: GitHub
          link: https://github.com/isalikov/hq-cropper

features:
    - icon: 📦
      title: Zero Dependencies
      details: Pure TypeScript with no external dependencies. Lightweight bundle size of ~24KB.
    - icon: 📱
      title: Mobile-Friendly
      details: Full touch support with responsive layout. Works great on phones and tablets.
    - icon: 🎨
      title: Fully Customizable
      details: Override any CSS class. Inherits fonts from your app. Supports custom themes.
    - icon: ⚡
      title: Framework Agnostic
      details: Works with React, Vue, Angular, Svelte, or vanilla JavaScript.
    - icon: 🖼️
      title: High Quality Output
      details: Configurable output size and compression. Supports JPEG and PNG formats.
    - icon: ✅
      title: Built-in Validation
      details: File type and size validation with customizable error handling.
---

## Quick Start

```bash
npm install hq-cropper
```

```typescript
import { HqCropper } from 'hq-cropper'

const cropper = HqCropper((base64, blob, state) => {
    console.log('Cropped image:', base64)
})

// Open file picker
document.querySelector('#button').addEventListener('click', () => {
    cropper.open()
})
```
