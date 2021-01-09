import { ErrorRequestHandler } from 'express';
import { AnyScopedFlare, AnyFlare } from '@flares/core';
export interface FlareErrorRequestHandlerOptions {
    /**
     * Wraps errors that are not {@link Flare} using specified {@link ScopedFlare} function
     * If not specified, error is passed to the next request error handler
     */
    wrapNonFlare?: AnyScopedFlare | ((err: any) => AnyFlare | Promise<AnyFlare>);
    /**
     * Maps handled {@link Flare} into another Flare
     * If not specified flare is not mapped
     */
    mapFlare?: (flare: AnyFlare) => AnyFlare | Promise<AnyFlare>;
    /**
     * Maps response before sending it via {@link Response.send}
     * If not specified flare is mapped using {@link SerializableFlare}
     * Note that flare argument here is already been mapped via {@link FlareErrorRequestHandlerOptions.mapFlare}
     */
    mapResponseBody?: <O>(flare: AnyFlare) => O | Promise<O>;
}
export declare function FlareErrorRequestHandler(options: FlareErrorRequestHandlerOptions): ErrorRequestHandler;
export declare const FlareMiddleware: typeof FlareErrorRequestHandler;
