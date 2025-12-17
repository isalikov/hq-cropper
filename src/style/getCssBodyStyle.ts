const getCssBodyStyle = (name: string): string => `
    .${name} {
        display: flex;
        flex: 1 1 auto;
        background: #33393F;
        overflow: hidden;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 500px;
        height: 500px;
        max-width: 100%;
        max-height: 60vh;
        min-height: 250px;
    }

    @media (max-width: 540px) {
        .${name} {
            width: 100%;
            height: auto;
            aspect-ratio: 1;
            max-height: 70vh;
        }
    }
`
export default getCssBodyStyle
