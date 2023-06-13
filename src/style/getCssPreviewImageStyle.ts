const getCssPreviewImageStyle = (name: string): string => `
    .${name} {
      backface-visibility: hidden;
      perspective: 1000px;
      max-inline-size: unset !important;
      max-block-size: unset !important;
    }
`
export default getCssPreviewImageStyle
