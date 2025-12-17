const getCssPortalAreaStyle = (name: string): string => `
    .${name} {
      position: absolute;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.6);
      touch-action: none;
    }
`
export default getCssPortalAreaStyle
