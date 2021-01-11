import { inherits } from 'util'

import { Non, Nullable} from '../misc'
import { defineStaticMethods, isStatusCodePropInRange, assertArgType } from '../toolkit'

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
 * Checks whether {@link Flare} instance has Information status code (100 <= status code < 200)
 */
export const isInfoFlare = isStatusCodePropInRange(100, 200)

/**
 * Checks whether {@link Flare} instance has Information status code (200 <= status code < 300)
 */
export const isSuccessFlare = isStatusCodePropInRange(200, 300)

/**
 * Checks whether {@link Flare} instance has Redirect status code (300 <= status code < 400)
 */
export const isRedirectFlare = isStatusCodePropInRange(300, 400)

/**
 * Checks whether {@link Flare} instance has Client error status code (400 <= status code < 500)
 */
export const isClientFlare = isStatusCodePropInRange(400, 500)

/**
 * Checks whether {@link Flare} instance has Server error status code (500 <= status code < 600)
 */
export const isServerFlare = isStatusCodePropInRange(500, 600)

/**
 * Checks if {@param value} is assignable to {@link Flare.message} parameter
 */
export function isFlareMessage (value: unknown): value is string {
    return typeof value === 'string'
}

/**
 * Checks if {@param value} is assignable to {@link Flare.cause} parameter
 */
export function isFlareCause (value: unknown): value is Nullable<Error> {
    return value === null
        || (typeof value === 'object' && value instanceof Error)
}

/**
 * Checks if {@param value} is assignable to {@link Flare.data} parameter
 */
export function isFlareData (value: unknown): value is Non<Error, object> {
    return typeof value === 'object' && !isFlareCause(value)
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

    assertArgType(statusCode, 'statusCode', 'number')
    assertArgType(statusText, 'statusText', 'string')

    const message = unordered.find(isFlareMessage) ?? ''
    const cause = unordered.find(isFlareCause) ?? null
    const data = unordered.find(isFlareData) ?? {}

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

/**
 * Callable/newable function
 * that produces new {@link Flare} instance
 */
export interface FlareConstructor extends CallableFlareConstructor, NewableFlareConstructor {
    name: 'Flare'

    isFlare:      typeof isFlare
    serializable: typeof SerializableFlare
    scoped:       typeof ScopedFlare

    isFlareMessage: typeof isFlareMessage
    isFlareCause:   typeof isFlareCause
    isFlareData:    typeof isFlareData

    isInfoFlare:     typeof isInfoFlare
    isSuccessFlare:  typeof isSuccessFlare
    isRedirectFlare: typeof isRedirectFlare
    isClientFlare:   typeof isClientFlare
    isServerFlare:   typeof isServerFlare
}

defineStaticMethods(FlareConstructor, {
    isFlare,

    isFlareMessage,
    isFlareData,
    isFlareCause,

    isInfoFlare,
    isSuccessFlare,
    isRedirectFlare,
    isClientFlare,
    isServerFlare
})

export const Flare = FlareConstructor

export type AnyFlare = Flare<number, string, string, object, Nullable<Error>>
