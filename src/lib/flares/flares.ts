import { Statuses } from '../statuses'
import { isScopedFlare, ScopedFlare } from '../scoped-flare'

export type Flares<S extends Statuses> = {
    [K in keyof S]: ScopedFlare<S[K][0], S[K][1]>
}

/**
 * Checks if {@param value} is assignable to {@link Flares} type
 */
export function isFlares<S extends Statuses> (value: Flares<S> | unknown): value is Flares<S> {
    return typeof value !== 'object' || typeof value === 'undefined' || value === null
        ? false
        : (value instanceof Flares || Object.values(value as object).every(isScopedFlare))
}

/**
 * Callable/Newable function
 * that produces {@link Flares} instance
 */
export interface FlaresConstructor {
    isFlares: typeof isFlares

    <S extends Statuses> (statuses: S): Flares<S>
    new <S extends Statuses> (statuses: S): Flares<S>
}

/**
 * Implementation of both {@link Flares} and {@link FlaresConstructor}
 * @see {Flares}
 * @see {FlaresConstructor}
 */
export const F: FlaresConstructor = function Flares<S extends Statuses> (statuses: S): Flares<S> {
    const flares = Object.create(Flares.prototype)

    for (const [method, [statusCode, statusText]] of Object.entries(statuses)) {
        flares[method as keyof S] = ScopedFlare(statusCode, statusText)
    }

    return flares
} as FlaresConstructor

F.isFlares = isFlares

export const Flares = F