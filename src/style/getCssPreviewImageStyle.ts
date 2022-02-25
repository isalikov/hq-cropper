const getCssPreviewImageStyle = (name: string): string => `
    .${name} {
      backface-visibility: hidden;
      perspective: 1000px;
    }
`
export default getCssPreviewImageStyle
