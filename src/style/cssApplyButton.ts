const cssApplyButton = (name: string): string => `
    .${name} {
        padding: 4px 16px;
        outline: 0;
        border: 0;
        background-color: #2F7FEF;
        color: #FFFFFF;
        border-radius: 20px;
        height: 30px;
        cursor: pointer;
    }

    .${name}:active {
        transform: translate(0, 1px);
    }
`
export default cssApplyButton
