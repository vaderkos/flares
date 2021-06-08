import { ErrorLike, isErrorLike } from '../../error-like'

import {
    Non,
    Nullish,
    Nullable,
    Undefinable,
    RequireKeys,
    isNull,
    isRecord,
    isString,
    isUndefined,
} from '../../internals'

// todo description
export type FlareExtras <
    M extends Undefinable<string>,
    D extends Undefinable<object>,
    C extends Nullish<ErrorLike>
> = {
    message?: M extends string
        ? M
        : M extends Undefinable<string>
            ? M
            : never
    data?: D extends object
        ? Non<ErrorLike, D>
        : D extends Undefinable<object>
            ? Non<ErrorLike, D>
            : never
    cause?: C extends Nullable<ErrorLike>
        ? C
        : C extends Nullish<ErrorLike>
            ? C
            : never
}

/**
 * Generic {@link FlareExtras} type
 * @see FlareExtras
 */
export type AnyFlareExtras =
    FlareExtras<Undefinable<string>, Undefinable<object>, Nullish<ErrorLike>>
/**
 * Generic {@link FlareExtras} type that has strictly typed {@link FlareExtras.message} property
 * @see FlareExtras
 * @see FlareExtras.message
 */
export type AnyMessageFlareExtras <M extends Undefinable<string>> = M extends string
    ? RequireKeys<'message', FlareExtras<M, Undefinable<object>, Nullish<ErrorLike>>>
    : FlareExtras<M, Undefinable<object>, Nullish<ErrorLike>>


/**
 * Generic {@link FlareExtras} type that has strictly typed {@link FlareExtras.data} property
 * @see FlareExtras
 * @see FlareExtras.data
 */
export type AnyDataFlareExtras <D extends Undefinable<object>> = D extends object
    ? RequireKeys<'data', FlareExtras<Undefinable<string>, D, Nullish<ErrorLike>>>
    : FlareExtras<Undefinable<string>, D, Nullish<ErrorLike>>


/**
 * Generic {@link FlareExtras} type that has strictly typed {@link FlareExtras.cause} property
 * @see FlareExtras
 * @see FlareExtras.cause
 */
export type AnyCauseFlareExtras <C extends Nullish<ErrorLike>> = C extends Nullable<ErrorLike>
    ? RequireKeys<'cause', FlareExtras<Undefinable<string>, Undefinable<object>, C>>
    : FlareExtras<Undefinable<string>, Undefinable<object>, C>

/**
 * Checks if {@param value} is assignable to {@link Flare.message} property.
 * {@link M} generic allows to explicitly set type guard.
 * @see Flare.message
 */
export function isFlareMessage <M extends string = string> (value: unknown): value is M {
    return isString(value)
}

/**
 * Checks if {@param value} is assignable to {@link Flare.cause} property.
 * {@link C} generic allows to explicitly set type guard.
 * @see Flare.cause
 */
export function isFlareCause <C extends Nullable<ErrorLike> = Nullable<ErrorLike>> (value: unknown): value is C {
    return isNull(value) || isErrorLike(value)
}

/**
 * Checks if {@param value} is assignable to {@link Flare.data} property.
 * {@link D} generic allows to explicitly set type guard.
 * @see Flare.data
 */
export function isFlareData <D extends object = object> (value: unknown): value is Non<ErrorLike, D> {
    return isRecord(value) && !isFlareCause(value)
}

/**
 * Checks if {@param value} is of {@link FlareExtras} type.
 * {@link FE} generic allows to explicitly set type guard.
 * @see FlareExtras
 * @see AnyFlareExtras
 */
export function isFlareExtras <FE extends AnyFlareExtras = AnyFlareExtras> (
    value: unknown
): value is FE {
    if (isErrorLike(value)) {
        return false
    }

    return isRecord(value)
        && (isUndefined(value.message) || isFlareMessage(value.message))
        && (isUndefined(value.data) || isFlareData(value.data))
        && (isUndefined(value.cause) || isFlareCause(value.cause))
}
