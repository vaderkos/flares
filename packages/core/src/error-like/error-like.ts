import { isString, isRecord } from '../internals'

/**
 *
 */
export type ErrorLike = Error | {
    name: string
    message: string
    stack: string
}

/**
 * Checks if {@param value} is of {@link ErrorLike} type.
 * {@link EL} generic allows to explicitly set type guard.
 */
export function isErrorLike<EL extends ErrorLike = ErrorLike> (value: unknown): value is EL {
    return value instanceof Error
        || (
            isRecord(value)
            && isString(value.name)
            && isString(value.message)
            && isString(value.stack)
        )
}
