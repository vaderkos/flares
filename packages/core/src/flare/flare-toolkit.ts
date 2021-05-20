import { Nullable, StatusCodeBetween, AnyRecord } from '../internals'

import { Flare } from './flare'
import { ErrorLike } from './error-like'
import { FlareLike, isFlareLike } from './flare-like'

/**
 * Checks if {@param value} is instance of {@link Flare}
 */
export function isFlare <
    SC extends number = number,
    ST extends string = string,
    M  extends string = string,
    D  extends object = AnyRecord,
    C  extends Nullable<ErrorLike> = Nullable<ErrorLike>,
> (value: unknown): value is Flare<SC, ST, M, D, C> {
    return isFlareLike(value)
        && ((value as any) instanceof Flare)
}

/**
 * Checks whether {@link Flare} instance has Information status code (100 <= status code < 200)
 */
export const isInfoFlare = StatusCodeBetween<FlareLike>(100, 200)

/**
 * Checks whether {@link Flare} instance has Success status code (200 <= status code < 300)
 */
export const isSuccessFlare = StatusCodeBetween<FlareLike>(200, 300)

/**
 * Checks whether {@link Flare} instance has Redirect status code (300 <= status code < 400)
 */
export const isRedirectFlare = StatusCodeBetween<FlareLike>(300, 400)

/**
 * Checks whether {@link Flare} instance has Client error status code (400 <= status code < 500)
 */
export const isClientFlare = StatusCodeBetween<FlareLike>(400, 500)

/**
 * Checks whether {@link Flare} instance has Server error status code (500 <= status code < 600)
 */
export const isServerFlare = StatusCodeBetween<FlareLike>(500, 600)

/**
 * Checks whether {@link Flare} instance has Server or Client error status code (400 <= status code < 600)
 */
export const isErrorFlare = StatusCodeBetween<FlareLike>(400, 600)


export const FlareToolkit = {
    isFlare,
    isFlareLike,

    isFlareMessage,
    isFlareCause,
    isFlareData,

    isInfoFlare,
    isSuccessFlare,
    isRedirectFlare,
    isClientFlare,
    isServerFlare,
    isErrorFlare,
} as const

export type FlareToolkit = typeof FlareToolkit