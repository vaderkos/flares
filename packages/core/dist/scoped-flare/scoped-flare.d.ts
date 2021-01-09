import { Flare } from '../flare';
import { Non, Nullable } from '../toolkit';
export interface NewableScopedFlare<SC extends number, ST extends string> {
    new <M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(cause?: C, data?: Non<Error, D>, message?: M): Flare<SC, ST, M, D, C>;
    new <M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(cause?: C, message?: M, data?: Non<Error, D>): Flare<SC, ST, M, D, C>;
    new <M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(message?: M, cause?: C, data?: Non<Error, D>): Flare<SC, ST, M, D, C>;
    new <M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(message?: M, data?: Non<Error, D>, cause?: C): Flare<SC, ST, M, D, C>;
    new <M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(data?: Non<Error, D>, cause?: C, message?: M): Flare<SC, ST, M, D, C>;
    new <M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(data?: Non<Error, D>, message?: M, cause?: C): Flare<SC, ST, M, D, C>;
}
export interface CallableScopedFlare<SC extends number, ST extends string> {
    <M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(cause?: C, data?: Non<Error, D>, message?: M): Flare<SC, ST, M, D, C>;
    <M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(cause?: C, message?: M, data?: Non<Error, D>): Flare<SC, ST, M, D, C>;
    <M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(message?: M, cause?: C, data?: Non<Error, D>): Flare<SC, ST, M, D, C>;
    <M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(message?: M, data?: Non<Error, D>, cause?: C): Flare<SC, ST, M, D, C>;
    <M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(data?: Non<Error, D>, cause?: C, message?: M): Flare<SC, ST, M, D, C>;
    <M extends string = '', D extends object = {}, C extends Nullable<Error> = null>(data?: Non<Error, D>, message?: M, cause?: C): Flare<SC, ST, M, D, C>;
}
/**
 * Callable/Newable function
 * that has bound statusCode and statusText for producing new {@link Flare} instance
 */
export interface ScopedFlare<SC extends number, ST extends string> extends NewableScopedFlare<SC, ST>, CallableScopedFlare<SC, ST> {
    name: string;
    statusCode: SC;
    statusText: ST;
}
/**
 * Callable/Newable function
 * that produces new {@link ScopedFlare} instance with bound {@param statusCode} and {@param statusText}
 */
export interface ScopedFlareConstructor {
    name: 'ScopedFlare';
    isScopedFlare: typeof isScopedFlare;
    <SC extends number, ST extends string>(statusCode: SC, statusText: ST): ScopedFlare<SC, ST>;
    new <SC extends number, ST extends string>(statusCode: SC, statusText: ST): ScopedFlare<SC, ST>;
}
/**
 * Checks if specified {@param value} is {@link ScopedFlare} instance, and has required properties
 */
export declare function isScopedFlare<SC extends number, ST extends string>(value: unknown): value is ScopedFlare<SC, ST>;
export declare const ScopedFlare: ScopedFlareConstructor;
