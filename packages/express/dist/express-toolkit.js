"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncErrorRequestHandler = exports.AsyncRequestHandler = void 0;
function AsyncRequestHandler(handler) {
    return (req, res, next) => {
        handler(req, res, next).catch(next);
    };
}
exports.AsyncRequestHandler = AsyncRequestHandler;
function AsyncErrorRequestHandler(errorHandler) {
    return (err, req, res, next) => {
        errorHandler(err, req, res, next).catch(next);
    };
}
exports.AsyncErrorRequestHandler = AsyncErrorRequestHandler;
//# sourceMappingURL=express-toolkit.js.map