const getCssApplyButtonStyle = (name: string): string => `
    .${name} {
        padding: 7px 16px;
        font-size: 14px;
        outline: 0;
        border: 0;
        background-color: #2F7FEF;
        color: #FFFFFF;
        border-radius: 20px;
        user-select: none;
        cursor: pointer;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    .${name}:active {
        transform: translate(0, 1px);
    }
`
export default getCssApplyButtonStyle
