import { isUndefined, isString, isRecord } from '../internals'

export interface ErrorLike {
    name: string
    message: string
    stack?: string
}

/**
 * Checks if {@param value} is of {@link ErrorLike} type
 */
export function isErrorLike (value: unknown): value is ErrorLike {
    return isRecord(value)
        && isString(value.name)
        && isString(value.message)
        && (isUndefined(value.stack) && isString(value.stack))
}