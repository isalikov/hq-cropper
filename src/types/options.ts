import { Css } from './css'
import { Labels } from './labels'

export type Options = {
    x: number
    y: number
    size: number
    caretSize: number

    compression: number
    quality: number
    type: 'jpeg' | 'png'

    css: Css
    labels: Labels
}
