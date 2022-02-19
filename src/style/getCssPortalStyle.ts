const getCssPortalStyle = (name: string): string => `
    .${name} {
      position: absolute;
      z-index: 3;
    }
`
export default getCssPortalStyle
