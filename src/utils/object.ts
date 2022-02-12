export const isObject = (obj: any): boolean => {
    return obj && typeof obj === 'object' && !Array.isArray(obj)
}

export const deepMerge = <T extends object>(...sources: T[]): T => {
    if (sources.length === 1) {
        return sources[0]
    }

    return sources.reduce<T>((result, obj) => {
        const target = Object.keys(obj).reduce<T>((rs, key) => {
            if (isObject(result[key]) && obj[key]) {
                return {
                    ...rs,
                    [key]: deepMerge(result[key], obj[key]),
                }
            }

            return {
                ...rs,
                [key]: obj[key],
            }
        }, {} as T)

        return {
            ...result,
            ...target,
        }
    }, {} as T)
}
