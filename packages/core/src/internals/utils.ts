import { AnyRecord, Fn, Nil, PickValues } from './types'

export const isNull = (value: unknown): value is null => value === null

export const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined'

export const isNil = (value: unknown): value is Nil => isNull(value) || isUndefined(value)

export const isFn = (value: unknown): value is Fn => typeof value === 'function'

export const isString = (value: unknown): value is string => typeof value === 'string'

export const isNumber = (value: unknown): value is number => typeof value === 'number'

export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol'

export const isObject = (value: unknown): value is object => typeof value === 'object'

/**
 * Checks if {@param value} is non-null object or function
 */
export const isRecord = <
    K extends keyof any = keyof any,
    V extends any = any
> (value: unknown): value is Record<K, V> => (isObject(value) && !isNull(value)) || isFn(value)

export function defineFnName <F extends Fn> (
    fn: F,
    name: string,
    ...generics: (string | number)[]
): F {
    const genericsStr = generics.length
        ? `<${generics.join(', ')}>`
        : ''

    return Object.defineProperty(fn, 'name', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: `${name}${genericsStr}`
    })
}

export function defineHiddenGetters <T extends AnyRecord> (
    target: T,
    props: Record<keyof T, (this: T) => T[keyof T]>
): T {
    return Object.defineProperties(target, Object.fromEntries(
        Object
            .entries(props)
            .map(([key, getter]) => [key, {
                configurable: false,
                enumerable: false,
                writable: true,
                get: getter
            }])
    ))
}

export function defineStaticProps <C extends Fn> (
    constructor: Fn,
    props: Record<keyof C, any>
): C {
    const descriptors = Object.fromEntries(
        Object
            .entries(props)
            .map(([name, impl]) => [name, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: impl
            }])
    )

    return Object.defineProperties(constructor, descriptors)
}

/**
 * Makes any function Newable and Callable constructor
 */
export function NewableCallable <C extends Fn> (constructor: C): C {

    const fn = function NewableCallable (...args: any[]): ReturnType<C> {
        return new (constructor as any)(...args)
    }

    defineFnName(fn, fn.name, constructor.name)

    return fn as C
}

export function NewableCallableClass <C extends Fn> (
    prototype: Record<keyof ReturnType<C>, any>,
    constructor: Fn,
    staticProps: Record<keyof C, any>,
): C {

    return defineStaticProps(
        NewableCallable(
            Object.defineProperty(constructor, 'prototype', {
                configurable: false,
                enumerable: false,
                writable: false,
                value: prototype
            })
        ),
        staticProps
    )
}

/**
 * Creates a function that checks if specified object's property 'statusCode' would be between
 * {@param fromInclusive} and {@param toExclusive}
 */
export function StatusCodeBetween <T extends { statusCode: number }> (
    fromInclusive: number,
    toExclusive: number
) {
    const fn = function StatusCodeBetween ({ statusCode }: T) {
        return statusCode >= fromInclusive
            && statusCode < toExclusive
    }

    defineFnName(fn, fn.name, fromInclusive, toExclusive)

    return fn
}

/**
 * Picks all functions from {@param record} and binds every to {@param record}
 */
export function Bound <T extends Record<any, any>> (record: T): PickValues<T, Fn> {
    return Object.fromEntries(
        Object
            .entries(record)
            .filter((entry) => isFn(entry[1]))
            .map(([ key, fn ]) => [ key, fn.bind(record) ])
    ) as PickValues<T, Fn> // meh, any in standard lib, have to cast explicitly
}
