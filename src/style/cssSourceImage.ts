const cssSourceImage = (name: string): string => `
    .${name} {
        backface-visibility: hidden;
        user-select: none;
        perspective: 1000px;
        overflow: hidden;
        display: block;
        transform: translateZ(0);
        width: auto;
    }
`
export default cssSourceImage
