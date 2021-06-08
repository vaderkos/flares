import { Nullable, Non, NewableCallableClass, defineHiddenGetters } from '../internals'
import { isFlareMessage, isFlareData, isFlareCause } from './flare-extras'
import { FlareConstructor } from './flare-constructor'

import { AnyFlareLike, FlareLike, isFlareLike } from './flare-like'
import { ErrorLike, isErrorLike } from '../error-like'

/**
 * todo description
 * For simplicity there are predefined generic types
 * @see AnyFlare
 * @see AnyDataFlare
 * @see AnyCauseFlare
 * @see AnyMessageFlare
 */
export interface Flare <
    SC extends number,
    ST extends string,
    M  extends string,
    D  extends object,
    C  extends Nullable<ErrorLike>
> extends Error {
    name:  string
    stack: string
    statusCode: SC
    statusText: ST
    message:    M
    data:       Non<ErrorLike, D> // Prevent ErrorLike from being assigned to data property
    cause:      C
}

/**
 * Generic {@link Flare} type
 * @see Flare
 */
export type AnyFlare =
    Flare<number, string, string, object, Nullable<ErrorLike>>

/**
 * Generic {@link Flare} type that has strictly typed {@link Flare.message} property
 * @see Flare
 * @see Flare.message
 */
export type AnyMessageFlare<M extends string> =
    Flare<number, string, M, Non<ErrorLike, object>, Nullable<ErrorLike>>

/**
 * Generic {@link Flare} type that has strictly typed {@link Flare.data} property
 * @see Flare
 * @see Flare.data
 */
export type AnyDataFlare<D extends object> =
    Flare<number, string, string, Non<ErrorLike, D>, Nullable<ErrorLike>>

/**
 * Generic {@link Flare} type that has strictly typed {@link Flare.cause} property
 * @see Flare
 * @see Flare.cause
 */
export type AnyCauseFlare<C extends Nullable<ErrorLike>> =
    Flare<number, string, string, Non<ErrorLike, object>, C>

/**
 * todo description
 * @see {Flare}
 * @see {FlareConstructor}
 */
export const Flare = NewableCallableClass<FlareConstructor>(
    defineHiddenGetters(Object.create(Error.prototype), {
        name: function (this: AnyFlare) {
            const sc = this.statusCode
            const st = this.statusText

            const m = this.message === ''
                ? '""'
                : 'string'

            const d = this.data?.constructor?.name === 'Object'
                ? (Object.keys(this.data).length ? 'object' : '{}')
                : (this.data?.constructor?.name ?? 'object')

            const c = isErrorLike(this.cause)
                ? this.cause.name
                : 'null'

            return `${this.constructor.name}<${sc}, "${st}", ${m}, ${d}, ${c}>`
        },
        serializable: function (this: AnyFlare) {

        }
    }),
    function Flare (...args: Parameters<FlareConstructor>) {
        const unpackArgs = (): AnyFlareLike => {
            if (isFlareLike(args[0])) {
                return args[0]
            }

            const [statusCode, statusText, ...unordered] = args

            const message = unordered.find(isFlareMessage)
            const cause = unordered.find(isFlareCause)
            const data = unordered.find(isFlareData)

            return { statusCode, statusText, message, data, cause }
        }

        const {
            statusText,
            statusCode,
            message = '',
            data = {},
            cause = null
        } = unpackArgs()


        Error.call(this, message)
        Error.captureStackTrace(this, new.target ?? Flare)
        Object.setPrototypeOf(this, new.target?.prototype ?? Flare.prototype)

        return Object.assign(this, {
            statusCode,
            statusText,
            message,
            cause,
            data
        })
    },
    {
        name: 'Flare'
    }
)
