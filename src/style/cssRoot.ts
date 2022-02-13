const getCssStyle = (name: string): string => `
    .${name} {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, .4);
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1000;
    }
`
export default getCssStyle
