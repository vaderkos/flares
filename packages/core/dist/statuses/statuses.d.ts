/**
 * {@link Flares} can be constructed from anything that is of {@link Statuses} type
 */
export declare type Statuses = {
    [methodName: string]: readonly [statusCode: number, statusText: string];
};
/**
 * Checks if {@param value} is of {@link Statuses} type
 */
export declare function isStatuses<S extends Statuses>(value: unknown): value is S;
