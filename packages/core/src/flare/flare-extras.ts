import { Non, Nullable, isNull, isRecord, isString, isUndefined, AnyRecord } from '../internals'
import { ErrorLike, isErrorLike } from './error-like'

// todo description
export type FlareExtras <
    M extends string,
    D extends object,
    C extends Nullable<ErrorLike> // todo consider reordering generics
> = {
    message?: M
    data?:    Non<ErrorLike, D> // Prevent ErrorLike from being assigned to data property
    cause?:   C
}

/**
 * {@link FlareExtras} type that has all properties generic
 * @see FlareExtras
 */
export interface AnyFlareExtras extends FlareExtras<string, AnyRecord, Nullable<ErrorLike>> {}

/**
 * {@link FlareExtras} type that has required, strictly typed {@link FlareExtras.message} property
 * @see FlareExtras
 * @see FlareExtras.message
 */
export interface AnyMessageFlareExtras <M extends string>
    extends FlareExtras<M, AnyRecord, Nullable<ErrorLike>> {
    message: M
}

/**
 * {@link FlareExtras} type that has required, strictly typed {@link FlareExtras.data} property
 */
export interface AnyDataFlareExtras <D extends object>
    extends FlareExtras<string, D, Nullable<ErrorLike>> {
    data: Non<ErrorLike, D>
}

/**
 * {@link FlareExtras} type that has required, strictly typed {@link FlareExtras.cause} property
 * @see FlareExtras
 * @see FlareExtras.cause
 */
export interface AnyCauseFlareExtras <C extends Nullable<ErrorLike>>
    extends FlareExtras<string, AnyRecord, C> {
    cause: C
}

/**
 * Checks if {@param value} is assignable to {@link Flare.message} parameter
 */
export function isFlareMessage (value: unknown): value is string {
    return isString(value)
}

/**
 * Checks if {@param value} is assignable to {@link Flare.cause} parameter
 */
export function isFlareCause (value: unknown): value is Nullable<ErrorLike> {
    return isNull(value) || isErrorLike(value)
}

/**
 * Checks if {@param value} is assignable to {@link Flare.data} parameter.
 * Ensures {@param value} is object that is not assignable to {@link Flare.cause}
 * Ensures that {@param value} is not of {@link ErrorLike} type
 * @see Flare.data
 * @see Flare.cause
 */
export function isFlareData <D extends object = AnyRecord> (value: unknown): value is Non<ErrorLike, D> {
    return isRecord(value) && !isFlareCause(value)
}

/**
 * Checks if {@param value} is of {@link FlareExtras} type.
 * If no "guard" {@link M}, {@link D} or {@link C} specified,
 * generics fallback to similar in {@link AnyFlareExtras}
 * @see FlareExtras
 * @see AnyFlareExtras
 */
export function isFlareExtras <
    M extends string = string,
    D extends object = AnyRecord,
    C extends Nullable<ErrorLike> = Nullable<ErrorLike>
> (value: unknown): value is FlareExtras<M, D, C> {
    return isRecord(value)
        && (isUndefined(value.message) || isFlareMessage(value.message))
        && (isUndefined(value.data) || isFlareData(value.data))
        && (isUndefined(value.cause) || isFlareCause(value.cause))
}
