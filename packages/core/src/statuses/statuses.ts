import { isNil, isNumber, isRecord, isString } from '../internals'

/**
 * {@link Flares} can be constructed from anything that is of {@link Statuses} type
 */
export type Statuses = {
    [methodName: string]: readonly [statusCode: number, statusText: string]
}

/**
 * Checks if {@param value} is assignable to {@link Statuses} type
 */
export function isStatuses <S extends Statuses> (value: unknown): value is S {
    return (isNil(value) || !isRecord(value))
        ? false
        : Object
            .values(value)
            .every(([ statusCode, statusText ]) => isNumber(statusCode) && isString(statusText))
}