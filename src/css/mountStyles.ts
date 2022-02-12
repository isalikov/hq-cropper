import classnames from './initialClassNames'

import getCssContainerStyle from './cssContainer'

const mountStyles = (): void => {
    const styleSource = `
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap');

        ${getCssContainerStyle(classnames.container)}
    `

    const style = document.createElement('style')
    style.innerHTML = styleSource

    const head = document.getElementsByTagName('head')[0]
    const headStyle = document.getElementsByTagName('style')[0]
    head.insertBefore(style, headStyle)
}

export default mountStyles
