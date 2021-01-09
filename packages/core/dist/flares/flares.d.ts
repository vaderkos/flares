import { ScopedFlare } from '../scoped-flare';
import { Statuses } from '../statuses';
export declare type Flares<S extends Statuses> = {
    [K in keyof S]: ScopedFlare<S[K][0], S[K][1]>;
};
/**
 * Checks if {@param value} is assignable to {@link Flares} type
 */
export declare function isFlares<S extends Statuses>(value: unknown): value is Flares<S>;
/**
 * Callable/Newable function
 * that produces {@link Flares} instance
 */
export interface FlaresConstructor {
    isFlares: typeof isFlares;
    <S extends Statuses>(statuses: S): Flares<S>;
    new <S extends Statuses>(statuses: S): Flares<S>;
}
/**
 * Implementation of both {@link Flares} and {@link FlaresConstructor}
 * @see {Flares}
 * @see {FlaresConstructor}
 */
export declare const FlaresConstructor: FlaresConstructor;
export declare const Flares: FlaresConstructor;
