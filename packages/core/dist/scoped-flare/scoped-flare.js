"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopedFlare = exports.isScopedFlare = void 0;
const util_1 = require("util");
const flare_1 = require("../flare");
/**
 * Implementation of both {@link ScopedFlare} and {@link ScopedFlareConstructor} interfaces
 * @see {}
 */
const ScopedFlareConstructor = function ScopedFlare(statusCode, statusText) {
    if (!new.target) {
        return new ScopedFlareConstructor(statusCode, statusText);
    }
    const instance = function (message, data, cause) {
        const flare = new flare_1.Flare(statusCode, statusText, message, data, cause);
        /* Recapture stacktrace to remove current function from stack */
        Error.captureStackTrace(flare, instance);
        return flare;
    };
    instance.statusCode = statusCode;
    instance.statusText = statusText;
    Object.setPrototypeOf(instance, new.target.prototype);
    Object.defineProperties(instance, {
        name: {
            configurable: true,
            enumerable: false,
            get() {
                return `${this.constructor.name}<${instance.statusCode}, "${instance.statusText}">`;
            }
        },
        constructor: {
            configurable: true,
            enumerable: false,
            value: new.target
        }
    });
    return instance;
};
util_1.inherits(ScopedFlareConstructor, Function);
/**
 * Checks if specified {@param value} is {@link ScopedFlare} instance, and has required properties
 */
function isScopedFlare(value) {
    return typeof value === 'function' && value instanceof ScopedFlareConstructor;
}
exports.isScopedFlare = isScopedFlare;
ScopedFlareConstructor.isScopedFlare = isScopedFlare;
exports.ScopedFlare = ScopedFlareConstructor;
//# sourceMappingURL=scoped-flare.js.map