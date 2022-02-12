export const getRandomString = (): string =>
    Math.random().toString(36).substr(2, 15)

export const getClassName = () =>
    `hq-cropper__${Math.random().toString(36).substring(2)}_${Math.random()
        .toString(36)
        .substring(2)}`

export const classnames = (...args: (string | undefined)[]): string => {
    return args
        .filter(Boolean)
        .filter((cn) => typeof cn === 'string')
        .join(' ')
}
