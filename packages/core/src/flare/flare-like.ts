import { Non, Nullable, AnyRecord, isNumber, isRecord, isString, isUndefined } from '../internals'

import { ErrorLike } from './error-like'
import { FlareExtras, isFlareCause, isFlareData, isFlareMessage } from './flare-extras'

export interface FlareLike <
    SC extends number = number,
    ST extends string = string,
    M  extends string = string,
    D  extends object = AnyRecord,
    C  extends Nullable<ErrorLike> = Nullable<ErrorLike>
> extends FlareExtras<M, D, C>{
    statusCode: SC
    statusText: ST
}

export type AnyFlareLike =
    FlareLike<number, string, string, AnyRecord, Nullable<ErrorLike>>

export type AnyDataFlareLike<D extends object> =
    FlareLike<number, string, string, Non<ErrorLike, D>, Nullable<ErrorLike>>

export type AnyCauseFlareLike<C extends ErrorLike> =
    FlareLike<number, string, string, AnyRecord, Nullable<C>>

export type AnyMessageFlareLike<M extends string> =
    FlareLike<number, string, M, AnyRecord, Nullable<ErrorLike>>

/**
 * Checks if {@param value} is of {@link FlareLike} type
 * @see FlareLike
 * @see AnyFlareLike
 */
export function isFlareLike <
    SC extends number = number,
    ST extends string = string,
    M  extends string = string,
    D  extends object = AnyRecord,
    C  extends Nullable<ErrorLike> = Nullable<ErrorLike>
> (value: unknown): value is FlareLike<SC, ST, M, D, C> {
    if (!isRecord(value)) {
        return false
    }

    const { statusCode, statusText, message, data, cause } = value

    return isNumber(statusCode)
        && isString(statusText)
        && (isUndefined(message) || isFlareMessage(message))
        && (isUndefined(data) || isFlareData(data))
        && (isUndefined(cause) || isFlareCause(cause))
}

