const getCssResizeBottomRightStyle = (name: string): string => `
    .${name} {
        display: block;
        z-index: 102;
        background-color: rgba(255, 255, 255, .6);
        cursor: se-resize;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        right: -3px;
        bottom: -3px;
        position: absolute;
        width: 5px;
        height: 5px;
    }
`
export default getCssResizeBottomRightStyle
