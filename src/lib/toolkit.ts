export type Nullable<T> = null | T

/**
 * Disallow subtype F of supertype T
 * Useful for some cases
 * @example
 * // Allow any object but not one that is Error
 * type NonErrorObject = Non<Error, object>
 * @example
 * // Allow any Animal but not it's subtype Dog
 * type NonDogAnimal = Non<Dog, Animal>
 */
export type Non<F, T> = T extends F ? never : T