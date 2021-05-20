import { Bound, isFn, isRecord } from './utils'
import { it } from 'mocha'
import { expect } from 'chai'
import { Fn, Predicate } from './types'

type NameProvider = Fn | string | Record<any, any>
type Param = string | number

const getName = (type: NameProvider): string => {
    if (isFn(type)) {
        return type.name
    }

    if (isRecord(type)) {
        return type.constructor.name
    }

    return type
}

export const TestTitleHelper = Bound({
    name (target: NameProvider) {
        return getName(target)
    },
    fnCall (fn: Fn) {
        return `${getName(fn)}(...)` as const
    },
    prop (target: NameProvider, prop: string) {
        return `${getName(target)}.${prop}}` as const
    },
    prototype (target: NameProvider, prop?: string) {
        return `${getName(target)}.prototype${prop ? `.${prop}` : ''}`
    },
    shouldSatisfy (fn: NameProvider) {
        return `Should satisfy ${getName(fn)}(...)` as const
    },
    shouldNotSatisfy (fn: NameProvider) {
        return `Should not satisfy ${getName(fn)}(...)` as const
    }
} as const)

export const CommonTests = Bound({

    typeOf (type: string, target: any) {
        it(`Should be of ${getName(type)} type`, () => {
            expect(target).is(type)
        })
    },

    notTypeOf (type: string, target: any) {
        it(`Should not be of ${getName(type)} type`, () => {
            expect(target).is.not(type)
        })
    },

    instanceOf (type: Fn, target: any) {
        it(`Should be instance of ${getName(type)}`, () => {
            expect(target).instanceOf(type)
        })
    },

    notInstanceOf (type: Fn, target: any) {
        it(`Should not be instance of ${getName(type)}`, () => {
            expect(target).not.instanceOf(type)
        })
    },

    satisfy (predicate: Predicate, target: any, ...params: Param[]) {
        it(`${getName(predicate)}(${params.join(',') ?? '...'}) should be true`, () => {
            expect(target).satisfies(predicate)
        })
    },

    notSatisfy (predicate: Predicate, target: any, ...params: Param[]) {
        it(`${getName(predicate)}(${params.join(',') ?? '...'}) should be false`, () => {
            expect(target).does.not.satisfy(predicate)
        })
    },

    satisfyType (type: NameProvider, predicate: Predicate, target: any, ...params: Param[]) {
        it(`Should be ${getName(type)}, by predicate ${getName(predicate)}(${params.join(',') ?? '...'})`, () => {
            expect(target).satisfies(predicate)
        })
    },

    notSatisfyType (type: NameProvider, predicate: Predicate, target: any, ...params: Param[]) {
        it(`Should not be ${getName(type)}, by predicate ${getName(predicate)}(${params.join(',') ?? '...'})`, () => {
            expect(target).does.not.satisfy(predicate)
        })
    }

} as const)