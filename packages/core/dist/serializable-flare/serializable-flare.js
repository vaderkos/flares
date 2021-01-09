"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializableFlare = void 0;
const flare_1 = require("../flare");
/**
 * Converts anything of {@link Nullable<Error>} type
 * to {@link SerializableFlare} that is plain object with all properties recursively enumerable
 * Result can be fully serialized with {@link JSON.stringify}
 */
function SerializableFlare(err) {
    if (err === null || err === undefined) {
        return null;
    }
    if (flare_1.Flare.isFlare(err)) {
        const { name, message, stack, statusCode, statusText, data, cause } = err;
        return {
            name,
            statusCode,
            statusText,
            message,
            data,
            stack,
            cause: SerializableFlare(cause)
        };
    }
    const { name, message, stack, cause } = err;
    return {
        name,
        message,
        stack: stack !== null && stack !== void 0 ? stack : '',
        cause: SerializableFlare(cause)
    };
}
exports.SerializableFlare = SerializableFlare;
//# sourceMappingURL=serializable-flare.js.map