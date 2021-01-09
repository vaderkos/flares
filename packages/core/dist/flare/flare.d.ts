import { Non, Nullable } from '../toolkit';
import { ScopedFlare } from '../scoped-flare';
import { SerializableFlare } from '../serializable-flare';
/**
 * Http response representation
 */
export interface Flare<SC extends number, ST extends string, M extends string = '', D extends object = {}, C extends Nullable<Error> = null> extends Error {
    name: string;
    stack: string;
    statusCode: SC;
    statusText: ST;
    message: M;
    data: D;
    cause: C;
}
/**
 * Checks if specified {@param value} is instance of {@link Flare}
 */
export declare function isFlare<SC extends number, ST extends string, M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(value: unknown): value is Flare<SC, ST, M, D, C>;
/**
 * Checks if {@param value} is assignable to {@link Flare.message} parameter
 */
export declare function isMessage(value: unknown): value is string;
/**
 * Checks if {@param value} is assignable to {@link Flare.cause} parameter
 */
export declare function isCause(value: unknown): value is Nullable<Error>;
/**
 * Checks if {@param value} is assignable to {@link Flare.data} parameter
 */
export declare function isData(value: unknown): value is Non<Error, object>;
export interface CallableFlareConstructor {
    <SC extends number, ST extends string, M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(statusCode: SC, statusText: ST, cause?: C, data?: Non<Error, D>, message?: M): Flare<SC, ST, M, D, C>;
    <SC extends number, ST extends string, M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(statusCode: SC, statusText: ST, cause?: C, message?: M, data?: Non<Error, D>): Flare<SC, ST, M, D, C>;
    <SC extends number, ST extends string, M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(statusCode: SC, statusText: ST, message?: M, cause?: C, data?: Non<Error, D>): Flare<SC, ST, M, D, C>;
    <SC extends number, ST extends string, M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(statusCode: SC, statusText: ST, message?: M, data?: Non<Error, D>, cause?: C): Flare<SC, ST, M, D, C>;
    <SC extends number, ST extends string, M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(statusCode: SC, statusText: ST, data?: Non<Error, D>, cause?: C, message?: M): Flare<SC, ST, M, D, C>;
    <SC extends number, ST extends string, M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(statusCode: SC, statusText: ST, data?: Non<Error, D>, message?: M, cause?: C): Flare<SC, ST, M, D, C>;
}
export interface NewableFlareConstructor {
    new <SC extends number, ST extends string, M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(statusCode: SC, statusText: ST, cause?: C, data?: Non<Error, D>, message?: M): Flare<SC, ST, M, D, C>;
    new <SC extends number, ST extends string, M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(statusCode: SC, statusText: ST, cause?: C, message?: M, data?: Non<Error, D>): Flare<SC, ST, M, D, C>;
    new <SC extends number, ST extends string, M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(statusCode: SC, statusText: ST, message?: M, cause?: C, data?: Non<Error, D>): Flare<SC, ST, M, D, C>;
    new <SC extends number, ST extends string, M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(statusCode: SC, statusText: ST, message?: M, data?: Non<Error, D>, cause?: C): Flare<SC, ST, M, D, C>;
    new <SC extends number, ST extends string, M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(statusCode: SC, statusText: ST, data?: Non<Error, D>, cause?: C, message?: M): Flare<SC, ST, M, D, C>;
    new <SC extends number, ST extends string, M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(statusCode: SC, statusText: ST, data?: Non<Error, D>, message?: M, cause?: C): Flare<SC, ST, M, D, C>;
}
/**
 * Callable/newable function
 * that produces new {@link Flare} instance
 */
export interface FlareConstructor extends CallableFlareConstructor, NewableFlareConstructor {
    name: 'Flare';
    isMessage: typeof isMessage;
    isCause: typeof isCause;
    isData: typeof isData;
    isFlare: typeof isFlare;
    serializable: typeof SerializableFlare;
    scoped: typeof ScopedFlare;
}
/**
 * Implementation of both {@link Flare} and {@link FlareConstructor}
 * @see {Flare}
 * @see {FlareConstructor}
 */
export declare const FlareConstructor: FlareConstructor;
export declare const Flare: FlareConstructor;
