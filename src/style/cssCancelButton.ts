const cssCancelButton = (name: string): string => `
    .${name} {
        padding: 4px 16px;
        outline: 0;
        border: 0;
        background-color: #E8EFF7;
        color: #768BA7;
        border-radius: 20px;
        height: 30px;
        cursor: pointer;
    }

    .${name}:active {
        transform: translate(0, 1px);
    }
`
export default cssCancelButton
