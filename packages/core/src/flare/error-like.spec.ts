import { describe } from 'mocha'

import {  TestTitleHelper as TTH, CommonTests as CT } from '../internals'

import { isErrorLike } from './error-like'

const withCapturedStack = (obj: any) => {
    Error.captureStackTrace(obj)
    return obj
}

const TestedType = TTH.name('ErrorLike')

describe(TestedType, () => {

    describe(TTH.fnCall(isErrorLike), () => {

        describe(TTH.shouldSatisfy(isErrorLike), () => {
            const targets = [
                withCapturedStack({
                    name: 'Error1',
                    message: 'Test1'
                }),
                new Error('Test3'),
                new TypeError('Test4'),
                Error.prototype,
                Object.create(Error.prototype),
                { message: 'Test2', name: 'Error' },
                {
                    message: 'Test5',
                    name: 'MyError',
                    stack: undefined
                },
                {
                    message: 'Test6',
                    name: 'aaa',
                    stack: 'bbb',
                    c: 1,
                    d: 2,
                    0: 'a',
                    1: 'b'
                },
                {
                    message: '',
                    name: '',
                    stack: ''
                }
            ]

            targets.forEach(target => CT.satisfyType(TestedType, isErrorLike, target, 'unknown'))
        })

        describe(TTH.shouldNotSatisfy(isErrorLike), () => {
            const targets = [
                {},
                withCapturedStack({}),
                { message: 'Test2' },
                { stack: 'Test3'},
                {
                    message: 'Test6',
                    stack: 'Missing name',
                    c: 1,
                    d: 2,
                    0: 'a',
                    1: 'b'
                },
                {
                    message: 1,
                    name: 2,
                    stack: 'Wrong types'
                }
            ]

            targets.forEach(target => CT.notSatisfyType(TestedType, isErrorLike, target, 'unknown'))
        })

    })

})