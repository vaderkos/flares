import { Non, Nullable } from '../internals'

import { Flare } from './flare'
import { ErrorLike } from '../error-like'
import { FlareLike } from './flare-like'
import { FlareExtras } from './flare-extras'

export interface CallableFlareConstructor {
    <
        SC extends number = number,
        ST extends string = string,
        M  extends string = '',
        D  extends object = {},
        C  extends Nullable<ErrorLike> = null,
    > (flareLike: FlareLike<SC, ST, FlareExtras<M, D, C>>): Flare<SC, ST, M, D, C>

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
    > (flareLike: FlareLike<SC, ST, FlareExtras<M, D, C>>): Flare<SC, ST, M, D, C>

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
 * Newable, callable {@link Flare} constructor
 */
export interface FlareConstructor extends CallableFlareConstructor, NewableFlareConstructor {
    name: 'Flare'
    // isFlare (value: unknown): boolean
    // isInfoFlare (value: unknown): boolean
    // isRedirectFlare (value: unknown): boolean
    // isSuccessFlare (value: unknown): boolean
    // isServerFlare (value: unknown): boolean
    // isErrorFlare (value: unknown): boolean
}
