import { inherits } from 'util'

import { Non, Nullable } from '../toolkit'
import { ScopedFlare } from '../scoped-flare'
import { SerializableFlare } from '../serializable-flare'

/**
 * Http response representation
 */
export interface Flare <
    SC extends number,
    ST extends string,
    M  extends string = '',
    D  extends object = {},
    C  extends Nullable<Error> = null,
> extends Error {
    name:  string
    stack: string
    statusCode: SC
    statusText: ST
    message:    M
    data:       D
    cause:      C
}

/**
 * Checks if specified {@param value} is instance of {@link Flare}
 */
export function isFlare <
    SC extends number,
    ST extends string,
    M  extends string = '',
    D  extends object = {},
    C  extends Nullable<Error> = null,
> (value: unknown): value is Flare<SC, ST, M, D, C> {
    return typeof value === 'object' && value instanceof Flare
}

/**
 * Checks if {@param value} is assignable to {@link Flare.message} parameter
 */
export function isMessage (value: unknown): value is string {
    return typeof value === 'string'
}

/**
 * Checks if {@param value} is assignable to {@link Flare.cause} parameter
 */
export function isCause (value: unknown): value is Nullable<Error> {
    return value === null
        || (typeof value === 'object' && value instanceof Error)
}

/**
 * Checks if {@param value} is assignable to {@link Flare.data} parameter
 */
export function isData (value: unknown): value is Non<Error, object> {
    return typeof value === 'object' && !isCause(value)
}

export interface CallableFlareConstructor {
    <
        SC extends number,
        ST extends string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<Error> = null,
    > (
        statusCode: SC,
        statusText: ST,
        cause?:   C,
        data?:    Non<Error, D>,
        message?: M
    ): Flare<SC, ST, M, D, C>

    <
        SC extends number,
        ST extends string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<Error> = null,
    > (
        statusCode: SC,
        statusText: ST,
        cause?:   C,
        message?: M,
        data?:    Non<Error, D>,
    ): Flare<SC, ST, M, D, C>

    <
        SC extends number,
        ST extends string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<Error> = null,
    > (
        statusCode: SC,
        statusText: ST,
        message?: M,
        cause?:   C,
        data?:    Non<Error, D>,
    ): Flare<SC, ST, M, D, C>

    <
        SC extends number,
        ST extends string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<Error> = null,
    > (
        statusCode: SC,
        statusText: ST,
        message?: M,
        data?:    Non<Error, D>,
        cause?:   C
    ): Flare<SC, ST, M, D, C>

    <
        SC extends number,
        ST extends string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<Error> = null,
    > (
        statusCode: SC,
        statusText: ST,
        data?:    Non<Error, D>,
        cause?:   C,
        message?: M
    ): Flare<SC, ST, M, D, C>

    <
        SC extends number,
        ST extends string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<Error> = null,
    > (
        statusCode: SC,
        statusText: ST,
        data?:    Non<Error, D>,
        message?: M,
        cause?:   C,
    ): Flare<SC, ST, M, D, C>
}

export interface NewableFlareConstructor {
    new <
        SC extends number,
        ST extends string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<Error> = null,
    > (
        statusCode: SC,
        statusText: ST,
        cause?:   C,
        data?:    Non<Error, D>,
        message?: M
    ): Flare<SC, ST, M, D, C>

    new <
        SC extends number,
        ST extends string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<Error> = null,
    > (
        statusCode: SC,
        statusText: ST,
        cause?:   C,
        message?: M,
        data?:    Non<Error, D>,
    ): Flare<SC, ST, M, D, C>

    new <
        SC extends number,
        ST extends string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<Error> = null,
    > (
        statusCode: SC,
        statusText: ST,
        message?: M,
        cause?:   C,
        data?:    Non<Error, D>,
    ): Flare<SC, ST, M, D, C>

    new <
        SC extends number,
        ST extends string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<Error> = null,
    > (
        statusCode: SC,
        statusText: ST,
        message?: M,
        data?:    Non<Error, D>,
        cause?:   C
    ): Flare<SC, ST, M, D, C>

    new <
        SC extends number,
        ST extends string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<Error> = null,
    > (
        statusCode: SC,
        statusText: ST,
        data?:    Non<Error, D>,
        cause?:   C,
        message?: M
    ): Flare<SC, ST, M, D, C>

    new <
        SC extends number,
        ST extends string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<Error> = null,
    > (
        statusCode: SC,
        statusText: ST,
        data?:    Non<Error, D>,
        message?: M,
        cause?:   C,
    ): Flare<SC, ST, M, D, C>
}

/**
 * Callable/newable function
 * that produces new {@link Flare} instance
 */
export interface FlareConstructor extends CallableFlareConstructor, NewableFlareConstructor {
    name: 'Flare'

    isMessage:    typeof isMessage
    isCause:      typeof isCause
    isData:       typeof isData
    isFlare:      typeof isFlare
    serializable: typeof SerializableFlare
    scoped:       typeof ScopedFlare
}

/**
 * Implementation of both {@link Flare} and {@link FlareConstructor}
 * @see {Flare}
 * @see {FlareConstructor}
 */
export const FlareConstructor: FlareConstructor = function Flare (...args: Parameters<FlareConstructor>) {
    if (!new.target) {
        return new (FlareConstructor as any)(...args)
    }

    const flare = this

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
} as unknown as FlareConstructor

inherits(FlareConstructor, Error)

Object.defineProperties(FlareConstructor.prototype, {
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
    }
})

/* Add methods from FlareConstructor */
Object.defineProperties(FlareConstructor, {
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
    }
})

export const Flare = FlareConstructor





