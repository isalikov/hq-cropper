const getCssStyle = (name: string): string => `
    .${name} {
        display: flex;
        background-color: red;
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1000;
    }
`
export default getCssStyle
