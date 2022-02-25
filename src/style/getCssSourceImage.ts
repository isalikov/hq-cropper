const getCssSourceImage = (name: string): string => `
    .${name} {
        backface-visibility: hidden;
        user-select: none;
        perspective: 1000px;
        overflow: hidden;
        display: block;
        transform: translateZ(0);
        width: auto;
        -webkit-user-drag: none;
        position: absolute;
        z-index: 1;
    }
`
export default getCssSourceImage
