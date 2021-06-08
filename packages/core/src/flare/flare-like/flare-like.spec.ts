import { describe, it } from 'mocha'
import { expect } from 'chai'

// import { Flare } from '../flare'
// import { ScopedFlare } from '../../scoped-flare'
import {
    titleFnCall,
    titleShouldSatisfy,
    titleShouldNotSatisfy,
    titleSatisfyType,
    titleNotSatisfyType
} from '../../internals'

import { AnyCauseFlareLike, AnyDataFlareLike, FlareLike, isFlareLike } from './flare-like'
import { AnyCauseFlare } from '../flare'
import { FlareExtras } from '../flare-extras'

const TT = 'FlareLike'

describe.only(TT, () => {
    describe(titleFnCall(isFlareLike), () => {
        describe(titleShouldSatisfy(isFlareLike), () => {
            const targets = [
                { statusCode: 0, statusText: 'Test0' },
                // new Flare(1, 'Test1'),
                // new ScopedFlare(2, 'Test2'),
                Object.assign(() => {}, {
                    statusCode: 3,
                    statusText: 'Test3',
                }),
                {
                    statusCode: 4,
                    statusText: 'Test4',
                    message: '',
                    data: {},
                    cause: null
                }
            ]

            for (const t of targets) {
                it(titleSatisfyType(TT, isFlareLike), () => {
                    expect(t).satisfy(isFlareLike)
                })
            }
        })

        describe(titleShouldNotSatisfy(isFlareLike), () => {
            const targets = [
                '',
                {},
                null,
                undefined,
                Symbol('Test0'),
                new Error('Test1'),
                { statusCode: 2 },
                { statusText: 'Test3' },
                { statusCode: 'Test4', statusText: 4 },
                { message: '', data: {}, cause: null },
                () => null,
                {
                    statusCode: 5,
                    statusText: 'Test5',
                    cause: null,
                    message: undefined,
                    data: 7777777
                }
            ]

            for (const t of targets) {
                it(titleNotSatisfyType(TT, isFlareLike), () => {
                    expect(t).not.satisfy(isFlareLike)
                })
            }
        })
    })

    type myType = 'error' | 'ok'

    const flareLike: FlareExtras<myType, any, any> = {
        message: undefined
    }

    flareLike.message

})
