import { ErrorRequestHandler } from 'express'
import {
    isFlare,
    isScopedFlare,
    isMessage,
    isData,
    isCause,
    SerializableFlare,
    AnyScopedFlare,
    AnyFlare,
} from '@flares/core'

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

    const toFlare = async (err: any) => {
        if (isFlare(err)) {
            return err
        }

        /* Dealing with forgotten call of ScopedFlare :P */
        if (isScopedFlare(err)) {
            return err()
        }

        if (isScopedFlare(wrapNonFlare)) {
            if (!isMessage(err) && !isData(err) && !isCause(err)) {
                throw new TypeError(`${wrapNonFlare.name} function called with wrong argument type ${typeof err}`)
            }

            return wrapNonFlare!!(err as any)
        }

        return wrapNonFlare!!(err)
    }


    return AsyncErrorRequestHandler(async (err, _req, res, next): Promise<void> => {
        if (!isFlare(err) && !isScopedFlare(err) && !wrapNonFlare) {
            next(err)
            return
        }

        err = toFlare(err)

        const flare = await mapFlare(err)

        res
            .status(flare.statusCode)
            .send(await mapResponseBody(flare))
    })
}

export const FlareMiddleware = FlareErrorRequestHandler

