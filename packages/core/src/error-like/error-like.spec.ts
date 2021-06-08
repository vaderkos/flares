import { describe, it } from 'mocha'
import { expect } from 'chai'

import {
    titleFnCall,
    titleShouldSatisfy,
    titleShouldNotSatisfy,
    titleSatisfyType,
    titleNotSatisfyType
} from '../internals'

import { isErrorLike } from './error-like'

const withCapturedStackTrace = (obj: any) => {
    Error.captureStackTrace(obj)
    return obj
}

const TT = 'ErrorLike'

describe(TT, () => {
    describe(titleFnCall(isErrorLike), () => {
        describe(titleShouldSatisfy(isErrorLike), () => {

            const targets = [
                withCapturedStackTrace({ name: 'Error1', message: 'Test1' }),
                new Error('Test3'),
                new TypeError('Test4'),
                Object.create(Error.prototype),
                { message: 'Test2', name: 'Error', stack: 'Test2Stack' },
                { message: 'Test6', name: 'aaa', stack: 'bbb', c: 1, d: 2, 0: 'a', 1: 'b' },
                { message: '', name: '', stack: '' }
            ]

            for (const t of targets) {
                it(titleSatisfyType(TT, isErrorLike), () => {
                    expect(t).to.satisfy(isErrorLike)
                })
            }
        })

        describe(titleShouldNotSatisfy(isErrorLike), () => {
            const targets = [
                {},
                withCapturedStackTrace({}),
                Error.prototype,
                { stack: 'Test3'},
                { message: 'Test2' },
                { message: 1, name: 2, stack: 'Wrong types' },
                { message: 'Test5', name: 'MyError', stack: undefined },
                { message: 'Test6', stack: 'Missing name', c: 1, d: 2, 0: 'a', 1: 'b' },
            ]

            for (const t of targets) {
                it(titleNotSatisfyType(TT, isErrorLike), () => {
                    expect(t).not.satisfy(isErrorLike)
                })
            }
        })
    })
})
