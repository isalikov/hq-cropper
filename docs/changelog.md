# Changelog

All notable changes to this project will be documented in this file.

## [4.0.0] - 2024-12-17

### Breaking Changes

- **Replace `quality` parameter with `outputSize`**: The confusing logarithmic `quality` parameter has been replaced with an intuitive `outputSize` parameter that specifies the exact output image dimensions in pixels
    - `outputSize: 0` (default) — output matches the original selection size
    - `outputSize: 512` — always outputs 512x512px image
    - Migration: Remove `quality` from your config and use `outputSize` instead

### Added

- Add comprehensive Storybook documentation with API reference
- Add custom styling examples (GradientTheme, DarkTheme, MinimalLight)
- Add font inheritance documentation
- Add VitePress documentation site at [hqcropper.dev](https://hqcropper.dev)

### Fixed

- Fix race condition: Escape key listener now added after image loads
- Fix `canvas.toBlob()` error handling with proper reject on failure

### Changed

- **Bundle size reduced by 7.2%** (25.46 KB → 23.62 KB)
- **Rename TypeScript types for clarity**:
    - `IConfig` → `ConfigurationOptions`
    - `IClassNames` → `ClassNames`
    - `IState` → `ApplicationState`
- Replace random CSS class names with deterministic hash (stable sourcemaps, debuggable in production)
- Consolidate 4 resize handler CSS files into single parameterized function
- Simplify DOM cache implementation using Map
- Replace `getRandomString()` with simple counter for listener IDs
- Use modern `node.remove()` instead of deprecated `removeChild()`
- Improve TypeScript types for DOM cache with mapped element types

### Removed

- Remove `src/utils.ts` (unused after refactoring)
- Remove 4 separate `getCssResize*Style.ts` files (consolidated)

## [3.3.0] - 2024-12-17

### Added

- Add mobile device support with touch events (`touchstart`, `touchmove`, `touchend`)
- Add responsive layout for small screens (<540px)
- Add `touch-action: none` to prevent scroll during portal interactions
- Increase resize handles touch target size (24px on mobile devices)

### Fixed

- Fix viewport height issues on mobile with `100dvh` and `position: fixed`
- Fix button clicks being blocked by `preventDefault` on `touchend`

## [3.2.0] - 2024-12-13

### Fixed

- Fix memory leak: state listeners now properly cleaned up on modal close
- Fix memory leak: DOM event listeners now properly removed on modal close
- Fix RESIZE_TL (top-left corner resize) using wrong variables
- Fix race condition: `canvas.remove()` now called after `toBlob` completes
- Fix MIME type format in canvas export
- Fix division by zero in `handleCropImage` when frame dimensions are 0
- Fix potential infinity/NaN when quality config is <= 1
- Fix incorrect DOM element types in observers
- Fix magic number in `getPortalProps`

### Added

- Add `unsubscribe(id)` method to remove specific listener by ID
- Add `unsubscribeAll()` method to clear all state listeners
- Add `minPortalSize` config option (default: 50px)
- Add `maxFileSize` config option (default: 0 = no limit)
- Add `allowedTypes` config option
- Add file validation before processing
- Add `onError` callback parameter
- Add `ErrorHandler` type export
- Add FileReader and Image error handling

### Changed

- `registerMouseEvents` now returns cleanup function
- Observers now use DOM element caching for better performance
- Mousemove events now throttled via `requestAnimationFrame`
- Portal and preview props observers merged
- Add comprehensive Storybook stories
- Migrate from yarn to pnpm

## [3.1.0] - Previous release

See [GitHub releases](https://github.com/isalikov/hq-cropper/releases) for earlier changes.
