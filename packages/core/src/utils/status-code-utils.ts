import { StatusCodeBetween } from '../internals'


/**
 * Checks if specified object's {@property statusCode} has Info value (100 <= status code < 200)
 */
export const hasInfoStatusCode = StatusCodeBetween(100, 200)

/**
 * Checks if specified object's {@property statusCode} has Success value (200 <= status code < 300)
 */
export const hasSuccessStatusCode = StatusCodeBetween(200, 300)

/**
 * Checks if specified object's {@property statusCode} has Redirect value (300 <= status code < 400)
 */
export const hasRedirectStatusCode = StatusCodeBetween(300, 400)

/**
 * Checks if specified object's {@property statusCode} has Client error value (400 <= status code < 500)
 */
export const hasClientStatusCode = StatusCodeBetween(400, 500)

/**
 * Checks if specified object's {@property statusCode} has Server error value (500 <= status code < 600)
 */
export const hasServerStatusCode = StatusCodeBetween(500, 600)

/**
 * Checks if specified object's {@property statusCode} has error value (400 <= status code < 600)
 */
export const hasErrorStatusCode = StatusCodeBetween(400, 600)

export const StatusCodeUtils = {
    hasInfoStatusCode,
    hasSuccessStatusCode,
    hasRedirectStatusCode,
    hasClientStatusCode,
    hasServerStatusCode,
    hasErrorStatusCode
} as const

export type StatusCodeUtils = typeof StatusCodeUtils