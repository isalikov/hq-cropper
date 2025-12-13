import type { IClassNames } from '../types'

interface DOMCache {
    header: HTMLDivElement | null
    sourceImage: HTMLImageElement | null
    portalArea: HTMLDivElement | null
    portal: HTMLDivElement | null
    previewImage: HTMLImageElement | null
}

let cache: DOMCache | null = null

export const getElement = <K extends keyof DOMCache>(
    key: K,
    css: IClassNames | undefined
): DOMCache[K] => {
    if (!cache) {
        return null
    }

    if (cache[key]) {
        return cache[key]
    }

    if (!css) {
        return null
    }

    switch (key) {
        case 'header':
            cache.header = document.querySelector<HTMLDivElement>(
                `.${css.header[0]}`
            )
            return cache.header as DOMCache[K]
        case 'sourceImage':
            cache.sourceImage = document.querySelector<HTMLImageElement>(
                `.${css.sourceImage[0]}`
            )
            return cache.sourceImage as DOMCache[K]
        case 'portalArea':
            cache.portalArea = document.querySelector<HTMLDivElement>(
                `.${css.portalArea[0]}`
            )
            return cache.portalArea as DOMCache[K]
        case 'portal':
            cache.portal = document.querySelector<HTMLDivElement>(
                `.${css.portal[0]}`
            )
            return cache.portal as DOMCache[K]
        case 'previewImage':
            cache.previewImage = document.querySelector<HTMLImageElement>(
                `.${css.previewImage[0]}`
            )
            return cache.previewImage as DOMCache[K]
        default:
            return null
    }
}

export const initCache = (): void => {
    cache = {
        header: null,
        sourceImage: null,
        portalArea: null,
        portal: null,
        previewImage: null,
    }
}

export const clearCache = (): void => {
    cache = null
}
