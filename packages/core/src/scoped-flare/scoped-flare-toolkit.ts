import { StatusCodeBetween, isFn, isNumber, isString } from '../internals'
import { AnyScopedFlare, AnyScopedFlareLike, ScopedFlare } from './scoped-flare'

/**
 * Checks if {@param value} is assignable to {@link AnyScopedFlareLike} type
 */
export function isScopedFlareLike (value: unknown): value is AnyScopedFlareLike {
    return isFn(value)
        && isNumber((value as any).statusCode)
        && isString((value as any).statusText)
}

/**
 * Checks if {@param value} is instance of {@link AnyScopedFlare}
 */
export function isScopedFlare (value: unknown): value is AnyScopedFlare {
    return isScopedFlareLike(value)
        && isString((value as any).name)
        && value instanceof ScopedFlare

}

/**
 * Checks whether {@link ScopedFlare} function creates Flare
 * that has Information status code (100 <= status code < 200)
 */
export const isInfoScopedFlare = StatusCodeBetween<AnyScopedFlare>(100, 200)

/**
 * Checks whether {@link ScopedFlare} function creates Flare
 * that has Information status code (200 <= status code < 300)
 */
export const isSuccessScopedFlare = StatusCodeBetween<AnyScopedFlare>(200, 300)

/**
 * Checks whether {@link ScopedFlare} function creates Flare
 * that has Redirect status code (300 <= status code < 400)
 */
export const isRedirectScopedFlare = StatusCodeBetween<AnyScopedFlare>(300, 400)

/**
 * Checks whether {@link ScopedFlare} function creates Flare
 * that has Client error status code (400 <= status code < 500)
 */
export const isClientScopedFlare = StatusCodeBetween<AnyScopedFlare>(400, 500)

/**
 * Checks whether {@link ScopedFlare} function create Flare
 * that has Server error status code (500 <= status code < 600)
 */
export const isServerScopedFlare = StatusCodeBetween<AnyScopedFlare>(500, 600)

/**
 * Checks whether {@link ScopedFlare} function create Flare
 * that has Server or Client error status code (400 <= status code < 600)
 */
export const isErrorScopedFlare = StatusCodeBetween<AnyScopedFlare>(400, 600)

export const ScopedFlareToolkit = {
    isScopedFlare,
    isScopedFlareLike,

    isInfoScopedFlare,
    isSuccessScopedFlare,
    isRedirectScopedFlare,
    isClientScopedFlare,
    isServerScopedFlare,
    isErrorScopedFlare,
} as const

export type ScopedFlareToolkit = typeof ScopedFlareToolkit
