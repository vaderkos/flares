import { ErrorRequestHandler } from 'express'
import { isFlare, SerializableFlare, AnyScopedFlare, AnyFlare } from '@flares/core'

import { AsyncErrorRequestHandler } from './express-toolkit'

export interface FlareErrorRequestHandlerOptions {
    /**
     * Wraps errors that are not {@link Flare} using specified {@link ScopedFlare} function
     * If not specified, error is passed to the next request error handler
     */
    wrapNonFlare?: AnyScopedFlare | ((err: any) => AnyFlare | Promise<AnyFlare>)

    /**
     * Maps handled {@link Flare} into another Flare
     * If not specified flare is not mapped
     */
    mapFlare?: (flare: AnyFlare) => AnyFlare | Promise<AnyFlare>

    /**
     * Maps response before sending it via {@link Response.send}
     * If not specified flare is mapped using {@link SerializableFlare}
     * Note that flare argument here is already been mapped via {@link FlareErrorRequestHandlerOptions.mapFlare}
     */
    mapResponseBody?: <O>(flare: AnyFlare) => O | Promise<O>
}

export function FlareErrorRequestHandler (options: FlareErrorRequestHandlerOptions): ErrorRequestHandler {

    const { wrapNonFlare } = options

    const mapFlare = options.mapFlare ?? (_ => _)
    const mapResponseBody = options.mapResponseBody ?? SerializableFlare


    return AsyncErrorRequestHandler(async (err, _req, res, next): Promise<void> => {
        if (!isFlare(err) && !wrapNonFlare) {
            next(err)
            return
        }

        err = isFlare(err)
            ? err
            : await wrapNonFlare!!(err)

        const flare = await mapFlare(err)

        res
            .status(flare.statusCode)
            .send(await mapResponseBody(flare))
    })
}

export const FlareMiddleware = FlareErrorRequestHandler

