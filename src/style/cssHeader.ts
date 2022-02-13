const cssHeader = (name: string): string => `
    .${name} {
        display: flex;
        justify-content: flex-start;
        gap: 10px;
        align-items: center;
        height: 60px;
        flex: 0 0 auto;
        padding: 0 20px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
`
export default cssHeader
