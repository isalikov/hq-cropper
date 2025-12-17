const getCssResizeTopRightStyle = (name: string): string => `
    .${name} {
        display: block;
        z-index: 102;
        background-color: rgba(255, 255, 255, .6);
        cursor: ne-resize;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        right: -3px;
        top: -3px;
        position: absolute;
        width: 5px;
        height: 5px;
        touch-action: none;
    }

    @media (max-width: 540px), (pointer: coarse) {
        .${name} {
            width: 24px;
            height: 24px;
            right: -12px;
            top: -12px;
        }
    }
`
export default getCssResizeTopRightStyle
