"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStatuses = void 0;
/**
 * Checks if {@param value} is of {@link Statuses} type
 */
function isStatuses(value) {
    return (typeof value !== 'object' || typeof value === 'undefined' || value === null)
        ? false
        : Object
            .values(value)
            .every(([code, text]) => typeof code === 'number' && typeof text === 'string');
}
exports.isStatuses = isStatuses;
//# sourceMappingURL=statuses.js.map