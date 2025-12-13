# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.2.0] - 2024-12-13

### Fixed

- Fix memory leak: state listeners now properly cleaned up on modal close via `unsubscribeAll()` ([aba5bd6](https://github.com/isalikov/hq-cropper/commit/aba5bd6))
- Fix memory leak: DOM event listeners (mouseup, mousedown, mousemove, keydown) now properly removed on modal close ([32c8334](https://github.com/isalikov/hq-cropper/commit/32c8334))
- Fix RESIZE_TL (top-left corner resize) using wrong variables for position calculation ([187dde4](https://github.com/isalikov/hq-cropper/commit/187dde4))
- Fix race condition: `canvas.remove()` now called after `toBlob` completes ([09abd72](https://github.com/isalikov/hq-cropper/commit/09abd72))
- Fix MIME type format in canvas export (was `jpeg`, now `image/jpeg`) ([09abd72](https://github.com/isalikov/hq-cropper/commit/09abd72))
- Fix division by zero in `handleCropImage` when frame dimensions are 0 ([e30f14d](https://github.com/isalikov/hq-cropper/commit/e30f14d))
- Fix potential infinity/NaN when quality config is <= 1 ([e30f14d](https://github.com/isalikov/hq-cropper/commit/e30f14d))
- Fix incorrect DOM element types in observers (`HTMLImageElement` to `HTMLDivElement`) ([9ec4461](https://github.com/isalikov/hq-cropper/commit/9ec4461))
- Fix magic number in `getPortalProps`: use `config.framePadding * 2` instead of hardcoded `3` ([151a033](https://github.com/isalikov/hq-cropper/commit/151a033))

### Added

- Add `unsubscribe(id)` method to remove specific listener by ID ([aba5bd6](https://github.com/isalikov/hq-cropper/commit/aba5bd6))
- Add `unsubscribeAll()` method to clear all state listeners ([aba5bd6](https://github.com/isalikov/hq-cropper/commit/aba5bd6))
- Add `minPortalSize` config option to prevent portal from becoming too small to interact with (default: 50px) ([187dde4](https://github.com/isalikov/hq-cropper/commit/187dde4))
- Add `maxFileSize` config option to limit input file size (default: 0 = no limit) ([0010512](https://github.com/isalikov/hq-cropper/commit/0010512))
- Add `allowedTypes` config option to restrict allowed MIME types (default: jpeg, png, gif, webp) ([0010512](https://github.com/isalikov/hq-cropper/commit/0010512))
- Add file validation before processing (type and size checks) ([0010512](https://github.com/isalikov/hq-cropper/commit/0010512))
- Add `onError` callback parameter to handle errors gracefully ([0010512](https://github.com/isalikov/hq-cropper/commit/0010512))
- Add `ErrorHandler` type export ([0010512](https://github.com/isalikov/hq-cropper/commit/0010512))
- Add FileReader and Image error handling ([0010512](https://github.com/isalikov/hq-cropper/commit/0010512))

### Changed

- `registerMouseEvents` now returns cleanup function for removing event listeners ([32c8334](https://github.com/isalikov/hq-cropper/commit/32c8334))
- Observers now use DOM element caching for better performance during mousemove events ([2df87ee](https://github.com/isalikov/hq-cropper/commit/2df87ee))
- Mousemove events now throttled via `requestAnimationFrame` for smoother performance ([6ed7e7a](https://github.com/isalikov/hq-cropper/commit/6ed7e7a))
- Portal and preview props observers merged into single observer for better performance ([bfb5d5b](https://github.com/isalikov/hq-cropper/commit/bfb5d5b))

## [3.1.0] - Previous release

See git history for changes before this refactoring.
