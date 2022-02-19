const getCssMoveStyle = (name: string): string => `
    .${name} {
        display: block;
        z-index: 101;
        outline: 1px dashed #aaa;
        background-color: transparent;
        cursor: move;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        position: absolute;
    }
`
export default getCssMoveStyle
