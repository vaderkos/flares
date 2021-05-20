import { Nullable, Non, NewableCallableClass, defineHiddenGetters } from '../internals'

import { FlareConstructor } from './flare-constructor'
import { FlareToolkit } from './flare-toolkit'
import { FlareExtras, isFlareMessage, isFlareData, isFlareCause } from './flare-extras'
import { FlareLike, isFlareLike } from './flare-like'
import { ErrorLike, isErrorLike } from './error-like'

/**
 *
 * Note! Use one of provided generic types
 * @see AnyFlare
 * @see AnyDataFlare
 * @see AnyCauseFlare
 * @see AnyMessageFlare
 */
export interface Flare <
    SC extends number = number,
    ST extends string = string,
    M  extends string = '',
    D  extends object = {},
    C  extends Nullable<ErrorLike> = null,
> extends Error {
    name:  string
    stack: string
    statusCode: SC
    statusText: ST
    message:    M
    data:       Non<ErrorLike, D> // Prevent ErrorLike from being assigned to data property
    cause:      C
}

export type AnyFlare = Flare<number, string, string, object, Nullable<ErrorLike>>

export type AnyDataFlare<D extends object> = Flare<number, string, string, Non<ErrorLike, D>, Nullable<ErrorLike>>

export type AnyCauseFlare<C extends ErrorLike> = Flare<number, string, string, Non<ErrorLike, object>, Nullable<C>>

export type AnyMessageFlare<M extends string> = Flare<number, string, M, Non<ErrorLike, object>, Nullable<ErrorLike>>

/**
 * todo Description
 * Implementation of both {@link Flare} and {@link FlareConstructor}
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

            const c = ((this.cause) instanceof Error)
                ? this.cause.name
                : 'null'

            return `${this.constructor.name}<${sc}, "${st}", ${m}, ${d}, ${c}>`
        }
    }),
    function Flare (...args: Parameters<FlareConstructor>) {

        const unpackArgs = () => {
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
        ...FlareToolkit,
        name: 'Flare'
    }
)

Object.defineProperty(Flare.prototype, 'name', {
    configurable: false,
    enumerable: false,
    writable: true,

})

const a = new Flare(100, 'asda')