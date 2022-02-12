import { classnames } from '../string'

describe('classnames', () => {
    it('should be expected classnames string', () => {
        const expected = 'a b d'

        expect(classnames('a', 'b', undefined, 'd')).toEqual(expected)
    })
})
