import { Nullable } from '../toolkit';
/**
 * Represents {@link Flare} that can be fully serialized by {@link JSON.stringify}
 * @see {Flare}
 */
export interface SerializableFlare {
    name: string;
    message: string;
    stack: string;
    statusCode?: number;
    statusText?: string;
    data?: object;
    cause?: Nullable<SerializableFlare>;
}
/**
 * Converts anything of {@link Nullable<Error>} type
 * to {@link SerializableFlare} that is plain object with all properties recursively enumerable
 * Result can be fully serialized with {@link JSON.stringify}
 */
export declare function SerializableFlare(err?: Nullable<Error>): Nullable<SerializableFlare>;
