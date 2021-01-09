"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flare = exports.FlareConstructor = exports.isData = exports.isCause = exports.isMessage = exports.isFlare = void 0;
const util_1 = require("util");
/**
 * Checks if specified {@param value} is instance of {@link Flare}
 */
function isFlare(value) {
    return typeof value === 'object' && value instanceof exports.Flare;
}
exports.isFlare = isFlare;
/**
 * Checks if {@param value} is assignable to {@link Flare.message} parameter
 */
function isMessage(value) {
    return typeof value === 'string';
}
exports.isMessage = isMessage;
/**
 * Checks if {@param value} is assignable to {@link Flare.cause} parameter
 */
function isCause(value) {
    return value === null
        || (typeof value === 'object' && value instanceof Error);
}
exports.isCause = isCause;
/**
 * Checks if {@param value} is assignable to {@link Flare.data} parameter
 */
function isData(value) {
    return typeof value === 'object' && !isCause(value);
}
exports.isData = isData;
/**
 * Implementation of both {@link Flare} and {@link FlareConstructor}
 * @see {Flare}
 * @see {FlareConstructor}
 */
exports.FlareConstructor = function Flare(...args) {
    var _a, _b, _c, _d, _e, _f;
    if (!new.target) {
        return new exports.FlareConstructor(...args);
    }
    const flare = this;
    const [statusCode, statusText, ...unordered] = args;
    const message = (_a = unordered.find(isMessage)) !== null && _a !== void 0 ? _a : '';
    const cause = (_b = unordered.find(isCause)) !== null && _b !== void 0 ? _b : null;
    const data = (_c = unordered.find(isData)) !== null && _c !== void 0 ? _c : {};
    Error.call(flare, message);
    Error.captureStackTrace(flare, (_d = (new.target)) !== null && _d !== void 0 ? _d : Flare);
    Object.setPrototypeOf(flare, (_f = (_e = (new.target)) === null || _e === void 0 ? void 0 : _e.prototype) !== null && _f !== void 0 ? _f : Flare.prototype);
    Object.assign(flare, {
        statusCode,
        statusText,
        message,
        cause
    });
    Object.defineProperty(flare, 'data', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: data
    });
    return flare;
};
util_1.inherits(exports.FlareConstructor, Error);
Object.defineProperties(exports.FlareConstructor.prototype, {
    name: {
        enumerable: false,
        get() {
            var _a, _b, _c, _d, _e;
            const sc = this.statusCode;
            const st = this.statusText;
            const m = this.message === ''
                ? '""'
                : 'string';
            const d = ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name) === 'Object'
                ? (Object.keys(this.data).length ? 'object' : '{}')
                : ((_e = (_d = (_c = this.data) === null || _c === void 0 ? void 0 : _c.constructor) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : 'object');
            const c = this.cause instanceof Error
                ? this.cause.name
                : 'null';
            return `${this.constructor.name}<${sc}, "${st}", ${m}, ${d}, ${c}>`;
        }
    }
});
/* Add methods from FlareConstructor */
Object.defineProperties(exports.FlareConstructor, {
    isFlare: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: isFlare
    },
    isMessage: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: isMessage
    },
    isData: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: isData
    },
    isCause: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: isCause
    }
});
exports.Flare = exports.FlareConstructor;
//# sourceMappingURL=flare.js.map