import { Nullable } from '../misc'

import { Flare } from '../flare'

/**
 * Represents {@link Flare} that can be fully serialized by {@link JSON.stringify}
 * @see {Flare}
 */
export interface SerializableFlare {
    name:    string
    message: string
    stack:   string
    statusCode?: number
    statusText?: string
    data?:  object
    cause?: Nullable<SerializableFlare>
}

/**
 * Converts anything of {@link Nullable<Error>} type
 * to {@link SerializableFlare} that is plain object with all Flare properties recursively enumerable
 * Result can be fully serialized with {@link JSON.stringify}
 */
export function SerializableFlare<E extends Error> (
    err?: Nullable<E>
): Nullable<E & SerializableFlare> {

    if (err === null || err === undefined) {
        return null
    }

    if (Flare.isFlare(err)) {
        const { name, message, stack, statusCode, statusText, data, cause } = err

        return {
            ...err,
            name,
            statusCode,
            statusText,
            message,
            data,
            stack,
            cause: SerializableFlare(cause as any)
        }
    }

    const { name, message, stack, cause } = err as (Error & { cause?: Error })

    return {
        ...err,
        name,
        message,
        stack: stack ?? '',
        cause: SerializableFlare(cause)
    }
}