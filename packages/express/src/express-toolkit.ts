import { ErrorRequestHandler, RequestHandler } from 'express-serve-static-core'


export type AsyncRequestHandler<T> = (...args: Parameters<RequestHandler>) => Promise<T>
export type AsyncErrorRequestHandler<T> = (...args: Parameters<ErrorRequestHandler>) => Promise<T>


export function AsyncRequestHandler<T> (handler: AsyncRequestHandler<T>): RequestHandler {
    return (req, res, next): void => {
        handler(req, res, next).catch(next)
    }
}

export function AsyncErrorRequestHandler<T> (errorHandler: AsyncErrorRequestHandler<T>): ErrorRequestHandler {
    return (err, req, res, next): void => {
        errorHandler(err, req, res, next).catch(next)
    }
}