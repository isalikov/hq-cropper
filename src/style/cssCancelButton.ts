const cssCancelButton = (name: string): string => `
    .${name} {
        padding: 7px 16px;
        font-size: 14px;
        outline: 0;
        border: 0;
        background-color: #E8EFF7;
        color: #768BA7;
        border-radius: 20px;
        cursor: pointer;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    .${name}:active {
        transform: translate(0, 1px);
    }
`
export default cssCancelButton
