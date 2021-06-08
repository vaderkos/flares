import { Flare, AnyFlare, FlareExtras, AnyFlareExtras, isFlareExtras, isFlareLike } from '../flare'
import { ErrorLike } from '../error-like'
import { Non, Nullable, Fn, isFn, NewableCallableClass, defineHiddenGetters } from '../internals'
import { ScopedFlareConstructor } from './scoped-flare-constructor'

export interface NewableScopedFlare <
    SC extends number,
    ST extends string,
    RM = undefined,
    RD extends object | {} = {},
    RC extends Nullable<ErrorLike> = null
> {
    new <
        M extends string = '',
        D extends RD = {},
        C extends RC = null
    > (cause?: C, data?: Non<ErrorLike, D>, message?: M): Flare<SC, ST, M, D, C>

    new <
        M extends string = '',
        D extends object = {},
        C extends Nullable<ErrorLike> = null
    > (cause?: C, message?: M, data?: Non<ErrorLike, D>): Flare<SC, ST, M, D, C>

    new <
        M extends string = '',
        D extends object = {},
        C extends Nullable<ErrorLike> = null
    > (message?: M, cause?: C, data?: Non<ErrorLike, D>): Flare<SC, ST, M, D, C>

    new <
        M extends string = '',
        D extends object = {},
        C extends Nullable<ErrorLike> = null
    > (message?: M, data?: Non<ErrorLike, D>, cause?: C): Flare<SC, ST, M, D, C>

    new <
        M extends string = '',
        D extends object = {},
        C extends Nullable<ErrorLike> = null
    > (data?: Non<ErrorLike, D>, cause?: C, message?: M): Flare<SC, ST, M, D, C>

    new <
        M extends string = '',
        D extends object = {},
        C extends Nullable<ErrorLike> = null
    > (data?: Non<ErrorLike, D>, message?: M, cause?: C): Flare<SC, ST, M, D, C>

    new <
        M extends string = '',
        D extends object = {},
        C extends Nullable<ErrorLike> = null
    > (flareExtras: FlareExtras<M, Non<ErrorLike, D>, C>): Flare<SC, ST, M, D, C>
}

export interface CallableScopedFlare<SC extends number, ST extends string> {
    <
        M extends string = '',
        D extends object = {},
        C extends Nullable<ErrorLike> = null
    > (cause?: C, data?: Non<ErrorLike, D>, message?: M): Flare<SC, ST, M, D, C>

    <
        M extends string = '',
        D extends object = {},
        C extends Nullable<ErrorLike> = null
    > (cause?: C, message?: M, data?: Non<ErrorLike, D>): Flare<SC, ST, M, D, C>

    <
        M extends string = '',
        D extends object = {},
        C extends Nullable<ErrorLike> = null
    > (message?: M, cause?: C, data?: Non<ErrorLike, D>): Flare<SC, ST, M, D, C>

    <
        M extends string = '',
        D extends object = {},
        C extends Nullable<ErrorLike> = null
    > (message?: M, data?: Non<ErrorLike, D>, cause?: C): Flare<SC, ST, M, D, C>

    <
        M extends string = '',
        D extends object = {},
        C extends Nullable<ErrorLike> = null
    > (data?: Non<ErrorLike, D>, cause?: C, message?: M): Flare<SC, ST, M, D, C>

    <
        M extends string = '',
        D extends object = {},
        C extends Nullable<ErrorLike> = null
    > (data?: Non<ErrorLike, D>, message?: M, cause?: C): Flare<SC, ST, M, D, C>

    <
        M extends string = '',
        D extends object = {},
        C extends Nullable<ErrorLike> = null
    > (flareExtras: FlareExtras<M, Non<ErrorLike, D>, C>): Flare<SC, ST, M, D, C>
}

/**
 * todo description
 * For simplicity there are predefined generic types
 */
export interface ScopedFlare <
    SC extends number,
    ST extends string,
> extends NewableScopedFlare<SC, ST>, CallableScopedFlare<SC, ST> {
    name: string
    statusCode: SC
    statusText: ST
}

/**
 * Checks if {@param value} is instance of {@link ScopedFlare}.
 * {@link SF} generic allows to explicitly set type guard.
 * @see ScopedFlare
 * @see FlareLike
 */
export function isScopedFlare <SF extends AnyScopedFlare = AnyScopedFlare> (
    value: unknown
): value is SF {
    return isFlareLike(value)
        && (value as any) instanceof ScopedFlare
}

export function is

/**
 * Generic {@link ScopedFlare} type
 * @see ScopedFlare
 */
export type AnyScopedFlare = ScopedFlare<number, string>

export const ScopedFlare = NewableCallableClass<ScopedFlareConstructor>(
    defineHiddenGetters(Object.create(Function.prototype), {
        name: function (this: AnyScopedFlare) {
            return `${this.constructor.name}<${this.statusCode}, "${this.statusText}">`
        }
    }),
    function ScopedFlare (statusCode: number, statusText: string): AnyScopedFlare {
        const instance = function (...args: Parameters<AnyScopedFlare>): AnyFlare {


            const flare = isFlareExtras(args[0])
                ? new Flare({ ...args[0], statusCode, statusText })
                : new Flare(statusCode, statusText, ...args)

            /* Recapture stacktrace to remove current function from stack */
            Error.captureStackTrace(flare, instance as Function)

            return flare
        }

        instance.statusCode = statusCode
        instance.statusText = statusText

        Object.setPrototypeOf(instance, new.target.prototype)

        Object.defineProperty(instance, 'constructor', {
            configurable: true,
            enumerable: false,
            value: new.target
        })

        return instance as AnyScopedFlare
    },
    {
        name: 'ScopedFlare',
        isScopedFlare
    }
)


