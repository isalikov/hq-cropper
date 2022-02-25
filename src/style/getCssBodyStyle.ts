const getCssBodyStyle = (name: string): string => `
    .${name} {
        display: flex;
        flex: 1 0 auto;
        background: #33393F;
        overflow: hidden;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 500px;
        height: 500px;
    }
`
export default getCssBodyStyle
