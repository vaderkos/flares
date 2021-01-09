import { ErrorRequestHandler, RequestHandler } from 'express-serve-static-core';
export declare type AsyncRequestHandler<T> = (...args: Parameters<RequestHandler>) => Promise<T>;
export declare type AsyncErrorRequestHandler<T> = (...args: Parameters<ErrorRequestHandler>) => Promise<T>;
export declare function AsyncRequestHandler<T>(handler: AsyncRequestHandler<T>): RequestHandler;
export declare function AsyncErrorRequestHandler<T>(errorHandler: AsyncErrorRequestHandler<T>): ErrorRequestHandler;
