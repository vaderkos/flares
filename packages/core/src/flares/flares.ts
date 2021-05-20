import { isScopedFlare, ScopedFlare } from '../scoped-flare'
import { Statuses } from '../statuses'
import { assertArgType, defineStaticMethods } from '../toolkit'

export type Flares<S extends Statuses, > = {
    [K in keyof S]: ScopedFlare<S[K][0], S[K][1]>
}

/**
 * Checks if {@param value} is assignable to {@link Flares} type
 */
export function isFlares<S extends Statuses> (value: unknown): value is Flares<S> {
    return (typeof value !== 'object' || typeof value === 'undefined' || value === null)
        ? false
        : (value instanceof Flares || Object.values(value as object).every(isScopedFlare))
}

/**
 * Checks if {@param value} is {@link Flares} instance where all values are info {@link ScopedFlare}
 */
export function isInfoFlares<S extends Statuses> (value: Flares<S>): boolean {
    return Object.values(value).every(ScopedFlare.isInfoScopedFlare)
}

/**
 * Checks if {@param value} is {@link Flares} instance where all values are success {@link ScopedFlare}
 */
export function isSuccessFlares<S extends Statuses> (value: Flares<S>): boolean {
    return Object.values(value).every(ScopedFlare.isSuccessScopedFlare)
}

/**
 * Checks if {@param value} is {@link Flares} instance where all values are redirect {@link ScopedFlare}
 */
export function isRedirectFlares<S extends Statuses> (value: Flares<S>): boolean {
    return Object.values(value).every(ScopedFlare.isRedirectScopedFlare)
}

/**
 * Checks if {@param value} is {@link Flares} instance where all values are client {@link ScopedFlare}
 */
export function isClientFlares<S extends Statuses> (value: Flares<S>): boolean {
    return Object.values(value).every(ScopedFlare.isClientScopedFlare)
}

/**
 * Checks if {@param value} is {@link Flares} instance where all values are server {@link ScopedFlare}
 */
export function isServerFlares<S extends Statuses> (value: Flares<S>): boolean {
    return Object.values(value).every(ScopedFlare.isServerScopedFlare)
}

export function isErrorFlares<S extends Statuses> (value: Flares<S>): boolean {
    return
}

/**
 * Callable/Newable function
 * that produces {@link Flares} instance
 */
export interface FlaresConstructor {
    isFlares: typeof isFlares
    isInfoFlares: typeof isInfoFlares
    isSuccessFlares: typeof isSuccessFlares
    isRedirectFlares: typeof isRedirectFlares
    isClientFlares: typeof isClientFlares
    isServerFlares: typeof isServerFlares

    <S extends Statuses> (statuses: S): Flares<S>
    new <S extends Statuses> (statuses: S): Flares<S>
}

/**
 * Implementation of both {@link Flares} and {@link FlaresConstructor}
 * @see {Flares}
 * @see {FlaresConstructor}
 */
export const FlaresConstructor: FlaresConstructor = function Flares<S extends Statuses> (statuses: S): Flares<S> {
    if (!new.target) {
        return new FlaresConstructor(statuses)
    }

    assertArgType(statuses, 'statuses', 'object')

    const flares = this

    for (const [method, [statusCode, statusText]] of Object.entries(statuses)) {
        flares[method as keyof S] = ScopedFlare(statusCode, statusText)
    }

    return flares
} as FlaresConstructor

defineStaticMethods(FlaresConstructor, {
    isFlares,
    isInfoFlares,
    isSuccessFlares,
    isRedirectFlares,
    isClientFlares,
    isServerFlares,
})

export const Flares = FlaresConstructor

