import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

export type AsyncErrorHandler<T> = (err: Error, req: Request, res: Response, next: NextFunction) => Promise<T>

export type ErrorHandler = ErrorRequestHandler
export const AsyncErrorHandler = <T>(handler: AsyncErrorHandler<T>): ErrorRequestHandler =>
    (err, req, res, next): void => {
        handler(err, req, res, next).catch(next)
    }