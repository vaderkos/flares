import { inherits } from 'util'

import { Flare, Message, Data, Cause } from '../flare'

export interface NewableScopedFlare<SC extends number, ST extends string> {
    new <
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null
    > (cause?: C, data?: D, message?: M): Flare<SC, ST, M, D, C>

    new <
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null
    > (cause?: C, message?: M, data?: D): Flare<SC, ST, M, D, C>

    new <
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null
    > (message?: M, cause?: C, data?: D): Flare<SC, ST, M, D, C>

    new <
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null
    > (message?: M, data?: D, cause?: C): Flare<SC, ST, M, D, C>

    new <
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null
    > (data?: D, cause?: C, message?: M): Flare<SC, ST, M, D, C>

    new <
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null
    > (data?: D, message?: M, cause?: C): Flare<SC, ST, M, D, C>
}

export interface CallableScopedFlare<SC extends number, ST extends string> {
    <
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null
    > (cause?: C, data?: D, message?: M): Flare<SC, ST, M, D, C>

    <
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null
    > (cause?: C, message?: M, data?: D): Flare<SC, ST, M, D, C>

    <
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null
    > (message?: M, cause?: C, data?: D): Flare<SC, ST, M, D, C>

    <
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null
    > (message?: M, data?: D, cause?: C): Flare<SC, ST, M, D, C>

    <
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null
    > (data?: D, cause?: C, message?: M): Flare<SC, ST, M, D, C>

    <
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null
    > (data?: D, message?: M, cause?: C): Flare<SC, ST, M, D, C>
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
 */
const SFC: ScopedFlareConstructor = function ScopedFlare <
    SC extends number,
    ST extends string
> (statusCode: SC, statusText: ST): ScopedFlare<SC, ST> {
    if (!new.target) {
        return new (ScopedFlare as any)(statusCode, statusText)
    }

    const instance = function <
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null
    > (message: M, data: D, cause: C): Flare<SC, ST, M, D, C> {
        const flare = (Flare as any)(statusCode, statusText, message, data, cause)

        /* Recapture stacktrace to remove to remove current function from stack */
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
                return `${instance.constructor.name}<${instance.statusCode}, "${instance.statusText}">`
            }
        },
        constructor: {
            configurable: true,
            enumerable: false,
            value: new.target
        }
    })

    return instance as unknown as ScopedFlare<SC, ST>
} as ScopedFlareConstructor

/**
 * Checks if specified {@param value} is {@link ScopedFlare} instance, and has required properties
 */
export function isScopedFlare <
    SC extends number,
    ST extends string
> (value: ScopedFlare<SC, ST> | unknown): value is ScopedFlare<SC, ST> {
    return typeof value === 'function'
        && value instanceof SFC
        && 'statusCode' in value
        && 'statusText' in value
        && 'name' in value
}

SFC.isScopedFlare = isScopedFlare

inherits(SFC, Function)

SFC.prototype.statusCode = 0
SFC.prototype.statusText = ''

export const ScopedFlare: ScopedFlareConstructor = SFC