const getCssPreviewStyle = (name: string): string => `
    .${name} {
      position: absolute;
      z-index: 100;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      border-radius: 50%;
    }
`
export default getCssPreviewStyle
