export const getRandomString = (): string =>
    Math.random().toString(36).substr(2, 15)
