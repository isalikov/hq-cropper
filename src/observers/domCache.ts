import type { IClassNames } from '../types'

type CacheKey =
    | 'header'
    | 'sourceImage'
    | 'portalArea'
    | 'portal'
    | 'previewImage'

interface ElementTypeMap {
    header: HTMLDivElement
    sourceImage: HTMLImageElement
    portalArea: HTMLDivElement
    portal: HTMLDivElement
    previewImage: HTMLImageElement
}

const cache = new Map<CacheKey, HTMLElement | null>()

const selectorMap: Record<CacheKey, keyof IClassNames> = {
    header: 'header',
    sourceImage: 'sourceImage',
    portalArea: 'portalArea',
    portal: 'portal',
    previewImage: 'previewImage',
}

export const getElement = <K extends CacheKey>(
    key: K,
    css: IClassNames | undefined
): ElementTypeMap[K] | null => {
    if (cache.has(key)) {
        return cache.get(key) as ElementTypeMap[K] | null
    }

    if (!css) {
        return null
    }

    const classNames = css[selectorMap[key]]
    const element = document.querySelector<ElementTypeMap[K]>(
        `.${classNames[0]}`
    )
    cache.set(key, element)
    return element
}

export const initCache = (): void => {
    cache.clear()
}

export const clearCache = (): void => {
    cache.clear()
}
