const getCssFooterStyle = (name: string): string => `
    .${name} {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        align-items: center;
        height: 60px;
        flex: 0 0 auto;
        padding: 0 20px;
        border-top: 1px solid #EEE;
    }

    @media (max-width: 540px) {
        .${name} {
            height: 56px;
            padding: 0 12px;
            gap: 8px;
        }
    }
`
export default getCssFooterStyle
