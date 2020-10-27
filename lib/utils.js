export const applyClassNames = (node, classNamesString = '') => {
    const source = classNamesString.split(' ')

    source.forEach((className) => {
        if (className && typeof className === 'string' && className.length > 0) {
            node.classList.add(className)
        }
    })
}

export const getClassName = () => `__${Math.random()
    .toString(36)
    .substring(2)}_${Math.random()
    .toString(36)
    .substring(2)}`

export const mergeClassNames = (...classNames) => {
    const source = classNames.filter(
        (className) => className
            && typeof className === 'string',
    )

    return source.join(' ')
}

export default { }
