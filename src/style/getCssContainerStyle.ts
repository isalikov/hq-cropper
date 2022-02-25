const getCssStyle = (name: string): string => `
    .${name} {
        display: flex;
        flex-direction: column;
        background-color: #FFFFFF;
        border-radius: 6px;
        box-shadow: 0 4px 16px rgba(77, 96, 124, 0.2);
    }
`
export default getCssStyle
