import classnames from './initialClassNames'

import getCssContainerStyle from './cssContainer'

const mountStyles = (): void => {
    const styleSource = `
        ${getCssContainerStyle(classnames.container)}
    `

    const style = document.createElement('style')
    style.innerHTML = styleSource

    const head = document.getElementsByTagName('head')[0]
    const headStyle = document.getElementsByTagName('style')[0]
    head.insertBefore(style, headStyle)
}

export default mountStyles
