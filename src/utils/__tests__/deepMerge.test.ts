import { deepMerge } from '../object'

describe('deepMerge', () => {
    it('should be an empty object', () => {
        expect(deepMerge()).toEqual({})
    })

    it('should be same object for one argument', () => {
        const obj = { foo: 'bar' }

        expect(deepMerge(obj)).toEqual(obj)
    })

    it('should be expected object #1', () => {
        const args = [
            { foo: 'bar' },
            { foo: 'foo' },
            { a: { x: 1 } },
            { a: { y: 1 } },
            { b: { x: { x: 1 } } },
            { b: { y: { x: 1 } } },
            { b: { x: { x: 2, z: 1 } } },
        ]

        const expected = {
            foo: 'foo',
            a: { x: 1, y: 1 },
            b: {
                x: { x: 2, z: 1 },
                y: { x: 1 },
            },
        }

        expect(deepMerge(...args)).toEqual(expected)
    })
})
