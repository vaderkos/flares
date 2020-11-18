/**
 * {@link Flares} can be constructed from anything that is of {@link Statuses} type
 */
export type Statuses = {
    [methodName: string]: readonly [statusCode: number, statusText: string]
}

/**
 * Checks if {@param value} is of {@link Statuses} type
 */
export function isStatuses <S extends Statuses> (value: unknown): value is S {
    return (typeof value !== 'object' || typeof value === 'undefined' || value === null)
        ? false
        : Object
            .values(value as object)
            .every(([code, text]) => typeof code === 'number' && typeof text === 'string')
}