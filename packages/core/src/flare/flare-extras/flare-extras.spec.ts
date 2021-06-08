import { describe, it } from 'mocha'
import { expect } from 'chai'

import {
    titleProp,
    titleFnCall,
    titleSatisfyType,
    titleNotSatisfyType,
    titleShouldSatisfy,
    titleShouldNotSatisfy,
} from '../../internals'

// import { Flare } from '../flare'
import { isFlareCause, isFlareData, isFlareExtras, isFlareMessage } from './flare-extras'

const TT = 'FlareExtras'

describe(TT, () => {
    describe(titleFnCall(isFlareExtras), () => {
        describe(titleShouldSatisfy(isFlareExtras), () => {
            const targets = [
                {},
                { message: '' },
                { data: {} },
                { data: { a: 1 } },
                { data: [] },
                { data: [1, 2, 3] },
                { cause: null },
                { cause: new Error('Test') },
                { cause: { message: 'Test3', name: 'Test4', stack: '' } },
                { message: '', data: {}, cause: null },
                { message: '', data: { a: 1 }, cause: new Error('Test') },
                { message: undefined, data: undefined, cause: undefined }
            ]

            for (const t of targets) {
                it(titleSatisfyType(TT, isFlareExtras), () => {
                    expect(t).satisfy(isFlareExtras)
                })
            }
        })

        describe(titleShouldNotSatisfy(isFlareExtras), () => {
            const targets = [
                5,
                null,
                undefined,
                'test4',
                new Error('Test6'),
                { message: 0 },
                { data: new Error('Test1') },
                { data: { message: 'Test3', name: 'Error3', stack: 'Test3'} },
            ]

            for (const t of targets) {
                it(titleNotSatisfyType(TT, isFlareExtras), () => {
                    expect(t).not.satisfy(isFlareExtras)
                })
            }
        })
    })

    describe(titleProp(TT, 'message'), () => {
        describe(titleFnCall(isFlareMessage), () => {
            describe(titleShouldSatisfy(isFlareMessage), () => {
                const targets = [
                    '',
                    'Test1'
                ]

                for (const t of targets) {
                    it(titleSatisfyType(titleProp(TT, 'message'), isFlareMessage), () => {
                        expect(t).satisfy(isFlareMessage)
                    })
                }
            })

            describe(titleShouldNotSatisfy(isFlareMessage), () => {
                const targets = [
                    {},
                    1,
                    null,
                    Symbol('Test2'),
                    undefined
                ]

                for (const t of targets) {
                    it(titleNotSatisfyType(titleProp(TT, 'message'), isFlareMessage), () => {
                        expect(t).not.satisfy(isFlareMessage)
                    })
                }
            })
        })
    })

    describe(titleProp(TT, 'data'), () => {
        describe(titleFnCall(isFlareData), () => {
            describe(titleShouldSatisfy(isFlareData), () => {
                const targets = [
                    {},
                    { a: 1 },
                    [],
                    [1, 2, 3],
                    Object.create({}),
                    Object.create(null),
                ]

                for (const t of targets) {
                    it(titleSatisfyType(titleProp(TT, 'data'), isFlareData), () => {
                        expect(t).satisfy(isFlareData)
                    })
                }
            })

            describe(titleShouldNotSatisfy(isFlareData), () => {
                const targets = [
                    null,
                    undefined,
                    'Test1',
                    new Error('Test2'),
                    { message: 'Test3', name: 'Test3', stack: 'asdad' },
                ]

                for (const t of targets) {
                    it(titleNotSatisfyType(titleProp(TT, 'data'), isFlareData), () => {
                        expect(t).not.satisfy(isFlareData)
                    })
                }
            })
        })
    })

    describe(titleProp(TT, 'cause'), () => {
        describe(titleFnCall(isFlareCause), () => {
            describe(titleShouldSatisfy(isFlareCause), () => {
                const targets = [
                    null,
                    new Error('Test1'),
                    { message: 'Test2', name: 'Test2', stack: 'dadasda' },
                    new TypeError('Test3'),
                    Object.create(Error.prototype),
                    // new Flare(5, 'Test5')
                ]

                for (const t of targets) {
                    it(titleSatisfyType(titleProp(TT, 'cause'), isFlareCause), () => {
                        expect(t).satisfy(isFlareCause)
                    })
                }
            })

            describe(titleShouldNotSatisfy(isFlareCause), () => {
                const targets = [
                    {},
                    undefined,
                    { a: 1 },
                    333,
                    'Test',
                    { message: 'Test4', name: 'Test4' },
                    { message: 'Test4', name: 'Test4', stack: undefined },
                ]

                for (const t of targets) {
                    it(titleNotSatisfyType(titleProp(TT, 'cause'), isFlareCause), () => {
                        expect(t).not.satisfy(isFlareCause)
                    })
                }
            })
        })
    })
})
