import { inherits } from 'util'

import { Flare } from '../flare'
import { Non, Nullable } from '../misc'
import { assertArgType, defineStaticMethods, isStatusCodePropInRange } from '../toolkit'

export interface NewableScopedFlare<SC extends number, ST extends string> {
    new <
        M extends string = '',
        D extends object = {},
        C extends Nullable<Error> = null
    > (cause?: C, data?: Non<Error, D>, message?: M): Flare<SC, ST, M, D, C>

    new <
        M extends string = '',
        D extends object = {},
        C extends Nullable<Error> = null
    > (cause?: C, message?: M, data?: Non<Error, D>): Flare<SC, ST, M, D, C>

    new <
        M extends string = '',
        D extends object = {},
        C extends Nullable<Error> = null
    > (message?: M, cause?: C, data?: Non<Error, D>): Flare<SC, ST, M, D, C>

    new <
        M extends string = '',
        D extends object = {},
        C extends Nullable<Error> = null
    > (message?: M, data?: Non<Error, D>, cause?: C): Flare<SC, ST, M, D, C>

    new <
        M extends string = '',
        D extends object = {},
        C extends Nullable<Error> = null
    > (data?: Non<Error, D>, cause?: C, message?: M): Flare<SC, ST, M, D, C>

    new <
        M extends string = '',
        D extends object = {},
        C extends Nullable<Error> = null
    > (data?: Non<Error, D>, message?: M, cause?: C): Flare<SC, ST, M, D, C>
}

export interface CallableScopedFlare<SC extends number, ST extends string> {
    <
        M extends string = '',
        D extends object = {},
        C extends Nullable<Error> = null
    > (cause?: C, data?: Non<Error, D>, message?: M): Flare<SC, ST, M, D, C>

    <
        M extends string = '',
        D extends object = {},
        C extends Nullable<Error> = null
    > (cause?: C, message?: M, data?: Non<Error, D>): Flare<SC, ST, M, D, C>

    <
        M extends string = '',
        D extends object = {},
        C extends Nullable<Error> = null
    > (message?: M, cause?: C, data?: Non<Error, D>): Flare<SC, ST, M, D, C>

    <
        M extends string = '',
        D extends object = {},
        C extends Nullable<Error> = null
    > (message?: M, data?: Non<Error, D>, cause?: C): Flare<SC, ST, M, D, C>

    <
        M extends string = '',
        D extends object = {},
        C extends Nullable<Error> = null
    > (data?: Non<Error, D>, cause?: C, message?: M): Flare<SC, ST, M, D, C>

    <
        M extends string = '',
        D extends object = {},
        C extends Nullable<Error> = null
    > (data?: Non<Error, D>, message?: M, cause?: C): Flare<SC, ST, M, D, C>
}

/**
 * Callable/Newable function
 * that has bound statusCode and statusText for producing new {@link Flare} instance
 */
export interface ScopedFlare<
    SC extends number,
    ST extends string
> extends NewableScopedFlare<SC, ST>, CallableScopedFlare<SC, ST> {
    name: string
    statusCode: SC
    statusText: ST
}

/**
 * Callable/Newable function
 * that produces new {@link ScopedFlare} instance with bound {@param statusCode} and {@param statusText}
 */
export interface ScopedFlareConstructor {
    name: 'ScopedFlare'

    isScopedFlare: typeof isScopedFlare

    isInfoScopedFlare:     typeof isInfoScopedFlare
    isSuccessScopedFlare:  typeof isSuccessScopedFlare
    isRedirectScopedFlare: typeof isRedirectScopedFlare
    isClientScopedFlare:   typeof isClientScopedFlare
    isServerScopedFlare:   typeof isServerScopedFlare

    <SC extends number, ST extends string>(
        statusCode: SC,
        statusText: ST
    ): ScopedFlare<SC, ST>

    new <SC extends number, ST extends string>(
        statusCode: SC,
        statusText: ST
    ): ScopedFlare<SC, ST>
}

/**
 * Implementation of both {@link ScopedFlare} and {@link ScopedFlareConstructor} interfaces
 * @see {}
 */
const ScopedFlareConstructor: ScopedFlareConstructor = function ScopedFlare <
    SC extends number,
    ST extends string
> (statusCode: SC, statusText: ST): ScopedFlare<SC, ST> {
    if (!new.target) {
        return new ScopedFlareConstructor(statusCode, statusText)
    }

    assertArgType(statusCode, 'statusCode', 'number')
    assertArgType(statusText, 'statusText', 'string')

    const instance = function <
        M extends string = '',
        D extends object = {},
        C extends Nullable<Error> = null
    > (message: M, data: D, cause: C): Flare<SC, ST, M, D, C> {
        const flare = new (Flare as any)(statusCode, statusText, message, data, cause)

        /* Recapture stacktrace to remove current function from stack */
        Error.captureStackTrace(flare, instance as Function)

        return flare
    } as ScopedFlare<SC, ST>

    instance.statusCode = statusCode
    instance.statusText = statusText

    Object.setPrototypeOf(instance, new.target.prototype)

    Object.defineProperties(instance, {
        name: {
            configurable: true,
            enumerable: false,
            get () {
                return `${this.constructor.name}<${instance.statusCode}, "${instance.statusText}">`
            }
        },
        constructor: {
            configurable: true,
            enumerable: false,
            value: new.target
        }
    })

    return instance
} as ScopedFlareConstructor

inherits(ScopedFlareConstructor, Function)

/**
 * Checks if specified {@param value} is {@link ScopedFlare} instance, and has required properties
 */
export function isScopedFlare <
    SC extends number,
    ST extends string
> (value: unknown): value is ScopedFlare<SC, ST> {
    return typeof value === 'function' && value instanceof ScopedFlareConstructor
}

/**
 * Checks whether {@link ScopedFlare} function creates Flare
 * that has Information status code (100 <= status code < 200)
 */
export const isInfoScopedFlare = isStatusCodePropInRange(100, 200)

/**
 * Checks whether {@link ScopedFlare} function creates Flare
 * that has Information status code (200 <= status code < 300)
 */
export const isSuccessScopedFlare = isStatusCodePropInRange(200, 300)

/**
 * Checks whether {@link ScopedFlare} function creates Flare
 * that has Redirect status code (300 <= status code < 400)
 */
export const isRedirectScopedFlare = isStatusCodePropInRange(300, 400)

/**
 * Checks whether {@link ScopedFlare} function creates Flare
 * that has Client error status code (400 <= status code < 500)
 */
export const isClientScopedFlare = isStatusCodePropInRange(400, 500)

/**
 * Checks whether {@link ScopedFlare} function create Flare
 * that has Server error status code (500 <= status code < 600)
 */
export const isServerScopedFlare = isStatusCodePropInRange(500, 600)

defineStaticMethods(ScopedFlareConstructor, {
    isScopedFlare,
    isInfoScopedFlare,
    isSuccessScopedFlare,
    isRedirectScopedFlare,
    isClientScopedFlare,
    isServerScopedFlare
})

ScopedFlareConstructor.isScopedFlare = isScopedFlare

export const ScopedFlare = ScopedFlareConstructor

export type AnyScopedFlare = ScopedFlare<number, string>
