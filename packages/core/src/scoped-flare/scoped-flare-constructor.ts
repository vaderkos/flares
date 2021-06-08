import { ScopedFlare, isScopedFlare } from './scoped-flare'

/**
 * Newable, callable {@link ScopedFlare} constructor
 */
export interface ScopedFlareConstructor {
    name: 'ScopedFlare'

    isScopedFlare: typeof isScopedFlare

    isInfoScopedFlare (value: unknown): boolean


    <SC extends number, ST extends string>(
        statusCode: SC,
        statusText: ST
    ): ScopedFlare<SC, ST>

    new <SC extends number, ST extends string>(
        statusCode: SC,
        statusText: ST
    ): ScopedFlare<SC, ST>
}