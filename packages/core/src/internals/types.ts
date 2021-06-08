export type AnyRecord = Record<any, any>

export type Nullable<T> = null | T

export type NonNullable<T> = T extends null ? never : T

export type Undefinable<T> = T | undefined

export type NonUndefinable<T> = T extends undefined ? never : T

export type Nullish<T = undefined> = T extends undefined
    ? (null | undefined)
    : (T | null | undefined)

export type NonNullish<T> = T extends Nullish ? never : T

export type Fn<R extends any = any, A extends any[] = any[]> = (...args: A) => R

export type Void<A extends any[] = any[]> = (...args: A) => void

export type Predicate<A extends any[] = any[]> = (...args: A) => boolean

export type Constructor<I extends any = any, A extends any[] = any[]> = new (...args: A) => I

/**
 * Utility type that is usable when you expect some value or PromiseLike with value
 * @example
 * type Test = { a: number }
 * async function doSmth (t: Awaitable<Test>): Promise<void> {
 *     const test: Test = await t
 *     ...
 * }
 * // Works both
 * doSmth({ a: 1 })
 * doSmth(Promise.resolve({ a: 2 }))
 */
export type Awaitable<T> = T | PromiseLike<T>

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

/**
 * Pick properties from T, that are of V type
 */
export type PickValues<T, V> = {
    [K in keyof T]: T[K] extends V
        ? T[K]
        : never
}

/**
 * Require from T those types that are assignable to K
 */
export type RequireKeys<K extends keyof T, T> = {
    [P in K]-?: T[P]
} & T

