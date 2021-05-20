import { describe, it } from 'mocha'
import { expect } from 'chai'

import { ScopedFlare } from '../scoped-flare'
import { TestTitleHelper as TT } from '../internals'


import { Flare } from './flare'
import { isFlareLike } from './flare-like'

const TestType = TT.name('FlareLike')

describe(TestType, () => {

    describe(TT.fnCall(isFlareLike), () => {

        it(TT.ofType(TestType), () => {

            expect({ statusCode: 0, statusText: 'Test0' }).satisfies(isFlareLike)

            expect({
                statusCode: 1,
                statusText: 'Test1',
                message: 'Test1',
                cause: new Error('Test1')
            }).satisfies(isFlareLike)

            expect(new Flare(2, 'Test2')).satisfies(isFlareLike)

            expect(new ScopedFlare(3, 'Test3')).satisfies(isFlareLike)

            expect(
                Object.assign(() => {}, {
                    statusCode: 4,
                    statusText: 'Test4',
                })
            ).satisfies(isFlareLike)

        })

        it(TT.notOfType(TestType), () => {
            expect({ }).does.not.satisfy(isFlareLike)

            expect({ statusText: 'Test1' }).does.not.satisfy(isFlareLike)

            expect({ statusCode: 2 }).does.not.satisfy(isFlareLike)

            expect(new Error('Test3')).does.not.satisfy(isFlareLike)

            expect({ message: 'Test4' }).does.not.satisfy(isFlareLike)

            expect({
                statusCode: 5,
                statusText: 'Test5',
                cause: null,
                message: undefined,
                data: 55555
            }).does.not.satisfy(isFlareLike)
        })

    })

})