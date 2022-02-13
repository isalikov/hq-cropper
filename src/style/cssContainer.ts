const getCssStyle = (name: string): string => `
    .${name} {
        display: flex;
        flex-direction: column;
        background-color: #FFFFFF;
        width: 400px;
        height: 461px;
        border-radius: 6px;
    }
`
export default getCssStyle
