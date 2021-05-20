import { Non, Nullable } from '../internals'

import { Flare } from './flare'
import { ErrorLike } from './error-like'
import { FlareLike } from './flare-like'
import { FlareToolkit } from './flare-toolkit'

export interface CallableFlareConstructor {
    <
        SC extends number = number,
        ST extends string = string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<ErrorLike> = null,
    > (flareLike: FlareLike<SC, ST, M, D, C>): Flare<SC, ST, M, D, C>

    <
        SC extends number = number,
        ST extends string = string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<ErrorLike> = null,
    > (
        statusCode: SC,
        statusText: ST,
        cause?:   C,
        data?:    Non<ErrorLike, D>,
        message?: M
    ): Flare<SC, ST, M, D, C>

    <
        SC extends number = number,
        ST extends string = string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<ErrorLike> = null,
    > (
        statusCode: SC,
        statusText: ST,
        cause?:   C,
        message?: M,
        data?:    Non<ErrorLike, D>,
    ): Flare<SC, ST, M, D, C>

    <
        SC extends number = number,
        ST extends string = string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<ErrorLike> = null,
    > (
        statusCode: SC,
        statusText: ST,
        message?: M,
        cause?:   C,
        data?:    Non<ErrorLike, D>,
    ): Flare<SC, ST, M, D, C>

    <
        SC extends number = number,
        ST extends string = string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<ErrorLike> = null,
    > (
        statusCode: SC,
        statusText: ST,
        message?: M,
        data?:    Non<ErrorLike, D>,
        cause?:   C
    ): Flare<SC, ST, M, D, C>

    <
        SC extends number = number,
        ST extends string = string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<ErrorLike> = null,
    > (
        statusCode: SC,
        statusText: ST,
        data?:    Non<ErrorLike, D>,
        cause?:   C,
        message?: M
    ): Flare<SC, ST, M, D, C>

    <
        SC extends number = number,
        ST extends string = string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<ErrorLike> = null,
    > (
        statusCode: SC,
        statusText: ST,
        data?:    Non<ErrorLike, D>,
        message?: M,
        cause?:   C,
    ): Flare<SC, ST, M, D, C>


}

export interface NewableFlareConstructor {
    new <
        SC extends number = number,
        ST extends string = string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<ErrorLike> = null,
    > (flareLike: FlareLike<SC, ST, M, D, C>): Flare<SC, ST, M, D, C>

    new <
        SC extends number = number,
        ST extends string = string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<ErrorLike> = null,
    > (
        statusCode: SC,
        statusText: ST,
        cause?:   C,
        data?:    Non<ErrorLike, D>,
        message?: M
    ): Flare<SC, ST, M, D, C>

    new <
        SC extends number = number,
        ST extends string = string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<ErrorLike> = null,
    > (
        statusCode: SC,
        statusText: ST,
        cause?:   C,
        message?: M,
        data?:    Non<ErrorLike, D>,
    ): Flare<SC, ST, M, D, C>

    new <
        SC extends number = number,
        ST extends string = string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<ErrorLike> = null,
    > (
        statusCode: SC,
        statusText: ST,
        message?: M,
        cause?:   C,
        data?:    Non<ErrorLike, D>,
    ): Flare<SC, ST, M, D, C>

    new <
        SC extends number = number,
        ST extends string = string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<ErrorLike> = null,
    > (
        statusCode: SC,
        statusText: ST,
        message?: M,
        data?:    Non<ErrorLike, D>,
        cause?:   C
    ): Flare<SC, ST, M, D, C>

    new <
        SC extends number = number,
        ST extends string = string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<ErrorLike> = null,
    > (
        statusCode: SC,
        statusText: ST,
        data?:    Non<ErrorLike, D>,
        cause?:   C,
        message?: M
    ): Flare<SC, ST, M, D, C>

    new <
        SC extends number = number,
        ST extends string = string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<ErrorLike> = null,
    > (
        statusCode: SC,
        statusText: ST,
        data?:    Non<ErrorLike, D>,
        message?: M,
        cause?:   C,
    ): Flare<SC, ST, M, D, C>
}

/**
 * Callable/newable function
 * that produces new {@link Flare} instance
 */
export interface FlareConstructor extends CallableFlareConstructor, NewableFlareConstructor, FlareToolkit {
    name: 'Flare'
}