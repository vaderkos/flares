import { describe } from 'mocha'

import { TestTitleHelper as TTH, CommonTests as CT } from '../internals'

import { isFlareCause, isFlareData, isFlareExtras, isFlareMessage } from './flare-extras'

const TestedType = TTH.name('FlareExtras')

describe(TestedType, () => {

    describe(TTH.fnCall(isFlareExtras), () => {
        describe(TTH.shouldSatisfy(isFlareExtras), () => {
            const targets = [
                {},
                { message: '' },
                { data: {} },
                { data: { a: 1 } },
                { data: [] },
                { data: [1, 2, 3] },
                { cause: null },
                { cause: new Error('Test') },
                { cause: { message: 'Test2', name: 'Test2' } },
                { cause: { message: 'Test3', name: 'Test4', stack: '' } },
                { message: '', data: {}, cause: null },
                { message: '', data: { a: 1 }, cause: new Error('Test') },
                { message: undefined, data: undefined, cause: undefined }
            ]

            targets.forEach(target => CT.satisfyType(TestedType, isFlareExtras, target))
        })

        describe(TTH.shouldNotSatisfy(isFlareExtras), () => {
            const targets = [
                undefined,
                { message: 0 },
                { data: new Error('Test1') },
                { data: { message: 'Test2', name: 'Error2' } },
                { data: { message: 'Test3', name: 'Error3', stack: 'Test3'} },
                'test4',
                5,
                new Error('Test6'),
            ]

            targets.forEach(target => CT.notSatisfyType(TestedType, isFlareExtras, target))
        })
    })

    describe(TTH.prop(TestedType, 'message'), () => {
        describe(TTH.fnCall(isFlareMessage), () => {
            describe(TTH.shouldSatisfy(isFlareMessage), () => {
                const targets = [
                    '',
                    'Test1',
                    undefined
                ]

                targets.forEach(target => CT.satisfyType(
                    TTH.prop(TestedType, 'message'),
                    isFlareMessage,
                    target
                ))
            })

            describe(TTH.shouldNotSatisfy(isFlareMessage), () => {
                const targets = [
                    {},
                    1,
                    Symbol('Test2'),
                    undefined
                ]

                targets.forEach(target => CT.notSatisfyType(
                    TTH.prop(TestedType, 'message'),
                    isFlareMessage,
                    target
                ))
            })
        })
    })

    describe(TTH.prop(TestedType, 'data'), () => {
        describe(TTH.fnCall(isFlareData), () => {
            describe(TTH.shouldSatisfy(isFlareData), () => {
                const targets = []

                targets.forEach(target => undefined)
            })

            describe(TTH.shouldNotSatisfy(isFlareData), () => {
                const targets = []

                targets.forEach(target => undefined)
            })
        })
    })

    describe(TTH.prop(TestedType, 'cause'), () => {
        describe(TTH.fnCall(isFlareCause), () => {
            describe(TTH.shouldSatisfy(isFlareCause), () => {
                const targets = []

                targets.forEach(target => undefined)
            })

            describe(TTH.shouldNotSatisfy(isFlareCause), () => {
                const targets = []

                targets.forEach(target => undefined)
            })
        })
    })

})