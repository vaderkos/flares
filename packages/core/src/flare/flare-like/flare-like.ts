import { ErrorLike } from '../../error-like'

import {
    Nullish,
    Undefinable,
    isNumber,
    isRecord,
    isString,
} from '../../internals'

import {
    AnyFlareExtras,
    AnyDataFlareExtras,
    AnyMessageFlareExtras,
    AnyCauseFlareExtras,
    isFlareExtras,
} from '../flare-extras'


/**
 * Generic type that represents "entities" similar to {@link Flare}
 * @see Flare
 * @see FlareExtras
 */
export type FlareLike<SC extends number,
    ST extends string,
    FE extends AnyFlareExtras> = FE & {
        statusCode: SC
        statusText: ST
    }

/**
 * Generic {@link FlareLike} type
 * @see FlareLike
 * @see FlareExtras
 */
export type AnyFlareLike = FlareLike<number, string, AnyFlareExtras>

/**
 * Generic {@link FlareLike} type that has strictly typed {@link FlareLike.data} property
 * @see FlareLike
 * @see FlareExtras
 * @see FlareExtras.data
 */
export type AnyDataFlareLike<D extends Undefinable<object>> =
    FlareLike<number, string, AnyDataFlareExtras<D>>

/**
 * Generic {@link FlareLike} type that has strictly typed {@link FlareLike.cause} property
 * @see FlareLike
 * @see FlareExtras
 * @see FlareExtras.cause
 */
export type AnyCauseFlareLike<C extends Nullish<ErrorLike>> =
    FlareLike<number, string, AnyCauseFlareExtras<C>>

/**
 * Generic {@link FlareLike} type that has strictly typed {@link FlareLike.message} property
 * @see FlareLike
 * @see FlareExtras
 * @see FlareExtras.message
 */
export type AnyMessageFlareLike<M extends string> =
    FlareLike<number, string, AnyMessageFlareExtras<M>>

/**
 * Checks if {@param value} is of {@link FlareLike} type.
 * {@link FL} generic allows to explicitly set type guard.
 * @see FlareLike
 * @see AnyFlareLike
 * @see FlareExtras
 */
export function isFlareLike<FL extends AnyFlareLike = AnyFlareLike> (
    value: unknown
): value is FL {
    if (!isRecord(value)) {
        return false
    }

    const { statusCode, statusText } = value

    return isNumber(statusCode)
        && isString(statusText)
        && isFlareExtras(value)
}