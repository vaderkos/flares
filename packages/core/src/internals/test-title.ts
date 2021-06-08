import { isFn, isRecord } from './utils'
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


export function titleName (target: NameProvider) {
    return getName(target)
}

export function titleFnCall (fn: Fn) {
    return `${getName(fn)}(...)` as const
}

export function titleProp (target: NameProvider, prop: string) {
    return `${getName(target)}.${prop}` as const
}

export function titlePrototype (target: NameProvider, prop?: string) {
    return `${getName(target)}.prototype${prop ? `.${prop}` : ''}`
}

export function titleShouldSatisfy (fn: NameProvider) {
    return `Should satisfy ${getName(fn)}(...)` as const
}

export function titleShouldNotSatisfy (fn: NameProvider) {
    return `Should not satisfy ${getName(fn)}(...)` as const
}

export function titleTypeOf (type: string) {
    return `Should be of ${getName(type)} type` as const
}

export function titleNotTypeOf (type: string) {
    return `Should not be of ${getName(type)} type` as const
}

export function titleInstanceOf (type: Fn) {
    return `Should be instance of ${getName(type)}` as const
}

export function titleNotInstanceOf (type: Fn) {
    return `Should not be instance of ${getName(type)}` as const
}

export function titleSatisfy (predicate: Predicate, ...params: Param[]) {
    return `${getName(predicate)}(${params.join(', ') || '...'}) should be true` as const
}

export function titleNotSatisfy (predicate: Predicate, ...params: Param[]) {
    return `${getName(predicate)}(${params.join(', ') || '...'}) should be false` as const
}

export function titleSatisfyType (type: NameProvider, predicate: Predicate, ...params: Param[]) {
    const pred = `${getName(predicate)}(${params.join(', ') || '...'})` as const

    return `Should be ${getName(type)}, by predicate ${pred}` as const
}

export function titleNotSatisfyType (type: NameProvider, predicate: Predicate, ...params: Param[]) {
    const pred = `${getName(predicate)}(${params.join(', ') || '...'})` as const

    return `Should not be ${getName(type)}, by predicate ${pred}` as const
}

