import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { SerializableFlare } from '../../serializable-flare'

export interface FlareErrorRequestHandlerOptions {
    onBeforeSendResponse?: (serializable: SerializableFlare) => Promise<any> | any
    sendResponse?: boolean
    wrapFurther?: boolean
    passFurther?: 'raw' | 'wrapped'
}

export function FlareErrorRequestHandler (options: FlareErrorRequestHandlerOptions): ErrorRequestHandler {
    // const map = options.map ?? (_ =>_)
    // const wrap = options.wrapFurther ?? false

    return function (err: Error, req: Request, res: Response, next: NextFunction): void {
        // if (Flare.)
        //
        // if (options.sendResponse ?? true) {
        //
        //     const serializable = SerializableFlare(err)
        //
        //
        //
        // }
    }
}

FlareErrorRequestHandler.verbose = function verbose () {
    // return _ => JSON
}