type Corner = 'tl' | 'tr' | 'bl' | 'br'

const cursorMap: Record<Corner, string> = {
    tl: 'nw-resize',
    tr: 'ne-resize',
    bl: 'sw-resize',
    br: 'se-resize',
}

const positionMap: Record<Corner, { h: string; v: string }> = {
    tl: { h: 'left', v: 'top' },
    tr: { h: 'right', v: 'top' },
    bl: { h: 'left', v: 'bottom' },
    br: { h: 'right', v: 'bottom' },
}

const getCssResizeHandlerStyle = (name: string, corner: Corner): string => {
    const cursor = cursorMap[corner]
    const { h, v } = positionMap[corner]

    return `
    .${name} {
        display: block;
        z-index: 102;
        background-color: rgba(255, 255, 255, .6);
        cursor: ${cursor};
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        ${h}: -3px;
        ${v}: -3px;
        position: absolute;
        width: 5px;
        height: 5px;
        touch-action: none;
    }

    @media (max-width: 540px), (pointer: coarse) {
        .${name} {
            width: 24px;
            height: 24px;
            ${h}: -12px;
            ${v}: -12px;
        }
    }
`
}

export default getCssResizeHandlerStyle
