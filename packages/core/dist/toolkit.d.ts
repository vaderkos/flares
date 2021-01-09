import { Flare } from './flare';
import { ScopedFlare } from './scoped-flare';
export declare type Nullable<T> = null | T;
/**
 * Disallow subtype N of supertype T
 * Useful for some cases
 * @see {Exclude}
 * @example
 * // Allow any object but not one that is Error
 * type NonErrorObject = Non<Error, object>
 * @example
 * // Allow any Animal but not it's subtype Dog
 * type NonDogAnimal = Non<Dog, Animal>
 */
export declare type Non<N, T> = Exclude<T, N>;
export declare type AnyFlare = Flare<number, string, string, object, Nullable<Error>>;
export declare type AnyScopedFlare = ScopedFlare<number, string>;
