import { ErrorRequestHandler } from 'express'
import {
    isFlare,
    isFlareCause,
    isFlareData,
    isFlareMessage,
    isInfoFlare,
    isSuccessFlare,
    isRedirectFlare,
    isClientFlare,
    isServerFlare,
    isScopedFlare,
    SerializableFlare,
    AnyScopedFlare,
    AnyFlare
} from '@flares/core'

import { AsyncErrorRequestHandler } from './express-toolkit'

export interface FlareErrorRequestHandlerOptions {
    /**
     * Wraps errors that are not {@link Flare} using specified {@link ScopedFlare} function
     * If not specified, error is passed to the next request error handler
     */
    wrapNonFlare?: AnyScopedFlare | ((err: any) => AnyFlare | Promise<AnyFlare>)

    /**
     * Maps response before sending it via {@link Response.send}
     * If not specified flare is mapped using {@link SerializableFlare}
     * Note that flare argument here is already been mapped via {@link FlareErrorRequestHandlerOptions.mapFlare}
     */
    mapResponseBody?: (flare: AnyFlare) => any | Promise<any>

    /**
     * Is asynchronously called after mapping flare
     * @param flare
     */
    onFlare?: (flare: AnyFlare) => any

    /**
     * Is asynchronously called if flare is info
     * @param flare
     */
    onInfoFlare?: (flare: AnyFlare) => any

    /**
     * Is asynchronously called if flare is success
     * @param flare
     */
    onSuccessFlare?: (flare: AnyFlare) => any

    /**
     * Is asynchronously called after mapping flare, if flare is redirect
     * @param flare
     */
    onRedirectFlare?: (flare: AnyFlare) => any

    /**
     * Is asynchronously called if flare is client error
     * @param flare
     */
    onClientFlare?: (flare: AnyFlare) => any

    /**
     * Is asynchronously called if flare is server error
     * @param flare
     */
    onServerFlare?: (flare: AnyFlare) => any
}

export function FlareErrorRequestHandler (options: FlareErrorRequestHandlerOptions): ErrorRequestHandler {

    const {
        wrapNonFlare,
        onFlare,
        onInfoFlare,
        onSuccessFlare,
        onRedirectFlare,
        onClientFlare,
        onServerFlare
    } = options

    const mapResponseBody = options.mapResponseBody ?? SerializableFlare

    const toFlare = async (err: any) => {
        if (isFlare(err)) {
            return err
        }

        /* Dealing with forgotten call of ScopedFlare :P */
        if (isScopedFlare(err)) {
            return err()
        }

        if (isScopedFlare(wrapNonFlare)) {
            if (
                !isFlareMessage(err)
                && !isFlareData(err)
                && !isFlareCause(err)
            ) {
                throw new TypeError(`${wrapNonFlare.name} function called with wrong argument type ${typeof err}`)
            }

            return wrapNonFlare!!(err as any)
        }

        /* Warning!!! check before toFlare call if it exists */
        return wrapNonFlare!!(err)
    }

    const on = (flare: AnyFlare): void => {
        if (!!onFlare) {
            setImmediate(() => onFlare(flare))
        }

        if (!!onInfoFlare && isInfoFlare(flare)) {
            setImmediate(() => onInfoFlare(flare))
        }

        if (!!onSuccessFlare && isSuccessFlare(flare)) {
            setImmediate(() => onSuccessFlare(flare))
        }

        if (!!onRedirectFlare && isRedirectFlare(flare)) {
            setImmediate(() => onRedirectFlare(flare))
        }

        if (!!onClientFlare && isClientFlare(flare)) {
            setImmediate(() => onClientFlare(flare))
        }

        if (!!onServerFlare && isServerFlare(flare)) {
            setImmediate(() => onServerFlare(flare))
        }
    }

    const shouldOn = !!(onFlare || onInfoFlare || onSuccessFlare || onRedirectFlare || onClientFlare || onServerFlare)

    return AsyncErrorRequestHandler(async (err, _req, res, next): Promise<void> => {
        if (!isFlare(err) && !isScopedFlare(err) && !wrapNonFlare) {
            next(err)
            return
        }

        const flare = await toFlare(err)

        if (shouldOn) {
            on(flare)
        }

        res
            .status(flare.statusCode)
            .send(await mapResponseBody(flare))
    })
}

export const FlareMiddleware = FlareErrorRequestHandler

