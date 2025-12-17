const getCssStyle = (name: string): string => `
    .${name} {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, .4);
        width: 100vw;
        height: 100vh;
        height: 100dvh;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1000;
        overflow-y: auto;
        box-sizing: border-box;
        padding: 16px;
    }

    @media (max-width: 540px) {
        .${name} {
            padding: 8px;
            align-items: flex-start;
            padding-top: env(safe-area-inset-top, 8px);
            padding-bottom: env(safe-area-inset-bottom, 8px);
        }
    }
`
export default getCssStyle
