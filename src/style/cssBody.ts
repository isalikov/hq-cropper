const cssBody = (name: string): string => `
    .${name} {
        display: flex;
        flex: 1 0 auto;
        background: #33393F;
        overflow: hidden;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 600px;
        width: 600px;
        border-top: 1px solid #EEE;
        border-bottom: 1px solid #EEE;
    }
`
export default cssBody
