const getCssPortalStyle = (name: string): string => `
    .${name} {
      position: absolute;
      z-index: 3;
      touch-action: none;
    }
`
export default getCssPortalStyle
