import { inherits } from 'util'

import { FlareSerializable } from '../flare-serializable'
import { ScopedFlare } from '../scoped-flare'
import { Non, Nullable } from '../toolkit'

export type Message = string
export type Data    = Non<Error, object>
export type Cause   = Nullable<Error>

/**
 * Http response representation
 */
export interface Flare<
    SC extends number = number,
    ST extends string = string,
    M  extends Message = '',
    D  extends Data    = {},
    C  extends Cause   = null,
> extends Error {
    name: string
    stack: string
    statusCode: SC
    statusText: ST
    message:    M
    data:       D
    cause:      C
}

export interface NewableFlareConstructor {
    new <
        SC extends number,
        ST extends string,
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null,
    > (
        statusCode: SC,
        statusText: ST,
        cause?: C,
        data?: Non<Error, D>,
        message?: M
    ): Flare<SC, ST, M, D, C>

    new <
        SC extends number,
        ST extends string,
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null,
    > (
        statusCode: SC,
        statusText: ST,
        cause?: C,
        message?: M,
        data?: Non<Error, D>,
    ): Flare<SC, ST, M, D, C>

    new <
        SC extends number,
        ST extends string,
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null,
    > (
        statusCode: SC,
        statusText: ST,
        message?: M,
        cause?: C,
        data?: Non<Error, D>,
    ): Flare<SC, ST, M, D, C>

    new <
        SC extends number,
        ST extends string,
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null,
    > (
        statusCode: SC,
        statusText: ST,
        message?: M,
        data?: Non<Error, D>,
        cause?: C
    ): Flare<SC, ST, M, D, C>

    new <
        SC extends number,
        ST extends string,
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null,
    > (
        statusCode: SC,
        statusText: ST,
        data?: Non<Error, D>,
        cause?: C,
        message?: M
    ): Flare<SC, ST, M, D, C>

    new <
        SC extends number,
        ST extends string,
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null,
    > (
        statusCode: SC,
        statusText: ST,
        data?: Non<Error, D>,
        message?: M,
        cause?: C,
    ): Flare<SC, ST, M, D, C>
}

export interface CallableFlareConstructor extends CallableFunction {
    <
        SC extends number,
        ST extends string,
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null,
    > (
        statusCode: SC,
        statusText: ST,
        cause?: C,
        data?: Non<Error, D>,
        message?: M
    ): Flare<SC, ST, M, D, C>

    <
        SC extends number,
        ST extends string,
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null,
    > (
        statusCode: SC,
        statusText: ST,
        cause?: C,
        message?: M,
        data?: Non<Error, D>,
    ): Flare<SC, ST, M, D, C>

    <
        SC extends number,
        ST extends string,
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null
    > (
        statusCode: SC,
        statusText: ST,
        message?: M,
        cause?: C,
        data?: Non<Error, D>,
    ): Flare<SC, ST, M, D, C>

    <
        SC extends number,
        ST extends string,
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null,
    > (
        statusCode: SC,
        statusText: ST,
        message?: M,
        data?: Non<Error, D>,
        cause?: C
    ): Flare<SC, ST, M, D, C>

    <
        SC extends number,
        ST extends string,
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null,
    > (
        statusCode: SC,
        statusText: ST,
        data?: Non<Error, D>,
        cause?: C,
        message?: M
    ): Flare<SC, ST, M, D, C>

    <
        SC extends number,
        ST extends string,
        M extends Message = '',
        D extends Data    = {},
        C extends Cause   = null,
    > (
        statusCode: SC,
        statusText: ST,
        data?: Non<Error, D>,
        message?: M,
        cause?: C,
    ): Flare<SC, ST, M, D, C>
}

/**
 * Callable/newable function
 * that produces new {@link Flare} instance
 */
export interface FlareConstructor extends NewableFlareConstructor, CallableFlareConstructor {
    isFlare: typeof isFlare
    isMessage: typeof isMessage
    isData: typeof isData
    isCause: typeof isCause
    scoped: typeof ScopedFlare
    serializable: typeof FlareSerializable
}

/**
 * Checks if specified {@param value} is instance of {@link Flare}
 */
export function isFlare <
    SC extends number,
    ST extends string,
    M extends Message = Message,
    D extends Data    = Data,
    C extends Cause   = Cause,
> (value: Flare<SC, ST, M, D, C> | unknown): value is Flare<SC, ST, M, D, C> {
    return typeof value === 'object'
        && value instanceof Flare
        && 'statusCode' in value
        && 'statusText' in value
        && 'message' in value
        && 'data' in value
        && 'cause' in value
        && 'name' in value
}

/**
 * Checks if {@param value} is assignable to {@link Flare.message} parameter
 */
export function isMessage <M extends Message> (value: unknown): value is M {
    return typeof value === 'string'
}

/**
 * Checks if {@param value} is assignable to {@link Flare.cause} parameter
 */
export function isCause <C extends Cause> (value: unknown): value is C {
    return value === null
        || (typeof value === 'object' && value instanceof Error)
}

/**
 * Checks if {@param value} is assignable to {@link Flare.data} parameter
 */
export function isData <D extends Data> (value: unknown): value is D {
    return typeof value === 'object' && !isCause(value)
}

/**
 * Implementation of both {@link Flare} and {@link FlareConstructor}
 * @see {Flare}
 * @see {FlareConstructor}
 */
const F: FlareConstructor = function Flare <
    SC extends number,
    ST extends string,
    M extends Message = '',
    D extends Data    = {},
    C extends Cause   = null,
> (...args: Parameters<FlareConstructor>): Flare<SC, ST, M, D, C>  {
    const flare = Object.create(Flare.prototype)

    const [statusCode, statusText, ...unordered] = args

    const message = unordered.find(isMessage) ?? ''
    const cause = unordered.find(isCause) ?? null
    const data = unordered.find(isData) ?? {}

    Error.call(flare, message)
    Error.captureStackTrace(flare, new.target ?? Flare)
    Object.setPrototypeOf(flare, new.target?.prototype ?? Flare.prototype)

    Object.assign(flare, {
        statusCode,
        statusText,
        message,
        cause
    })

    Object.defineProperty(flare, 'data', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: data
    })

    return flare
} as FlareConstructor


inherits(F, Error)

/* Add methods from FlareConstructor */
Object.defineProperties(F, {
    isFlare: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: isFlare
    },
    isMessage: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: isMessage
    },
    isData: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: isData
    },
    isCause: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: isCause
    },
    scoped: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: ScopedFlare
    },
    serializable: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: FlareSerializable
    }
})


/*
    Adding defaults to prototype so Flare instance
    can be created using Object.create(Flare.prototype)
*/

F.prototype.statusCode = 0
F.prototype.statusText = ''
F.prototype.message    = ''
F.prototype.cause      = null
F.prototype.stack      = ''

Object.defineProperties(F.prototype, {
    name: {
        enumerable: false,
        get () {
            const sc = this.statusCode
            const st = this.statusText

            const m = this.message === ''
                ? '""'
                : 'string'

            const d = this.data?.constructor?.name === 'Object'
                ? (Object.keys(this.data).length ? 'object' : '{}')
                : (this.data?.constructor?.name ?? 'object')

            const c = this.cause instanceof Error
                ? this.cause.name
                : 'null'

            return `${this.constructor.name}<${sc}, "${st}", ${m}, ${d}, ${c}>`
        }
    },
    data: {
        configurable: true,
        enumerable: true,
        get () {
            return {}
        }
    }
})

export const Flare: FlareConstructor = F