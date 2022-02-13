const cssFooter = (name: string): string => `
    .${name} {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        align-items: center;
        height: 60px;
        border-top: 1px solid #EEE;
        flex: 0 0 auto;
        padding: 0 20px;
    }
`
export default cssFooter