import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

export interface FlareErrorRequestHandlerOptions <

> {

}

export function FlareErrorRequestHandler (options: FlareErrorRequestHandlerOptions): ErrorRequestHandler {
    return function (err: Error, req: Request, res: Response, next: NextFunction): void {

    }
}