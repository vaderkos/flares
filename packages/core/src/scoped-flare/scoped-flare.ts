import { inherits } from 'util'

import { Flare } from '../flare'
import { Non, Nullable } from '../toolkit'

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

ScopedFlareConstructor.isScopedFlare = isScopedFlare

export const ScopedFlare = ScopedFlareConstructor
