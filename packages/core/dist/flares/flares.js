"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flares = exports.FlaresConstructor = exports.isFlares = void 0;
const scoped_flare_1 = require("../scoped-flare");
/**
 * Checks if {@param value} is assignable to {@link Flares} type
 */
function isFlares(value) {
    return (typeof value !== 'object' || typeof value === 'undefined' || value === null)
        ? false
        : (value instanceof exports.Flares || Object.values(value).every(scoped_flare_1.isScopedFlare));
}
exports.isFlares = isFlares;
/**
 * Implementation of both {@link Flares} and {@link FlaresConstructor}
 * @see {Flares}
 * @see {FlaresConstructor}
 */
exports.FlaresConstructor = function Flares(statuses) {
    if (!new.target) {
        return new exports.FlaresConstructor(statuses);
    }
    const flares = this;
    for (const [method, [statusCode, statusText]] of Object.entries(statuses)) {
        flares[method] = scoped_flare_1.ScopedFlare(statusCode, statusText);
    }
    return flares;
};
exports.FlaresConstructor.isFlares = isFlares;
exports.Flares = exports.FlaresConstructor;
//# sourceMappingURL=flares.js.map