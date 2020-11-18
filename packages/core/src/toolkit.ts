export type Nullable<T> = null | T

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
export type Non<N, T> = Exclude<T, N>