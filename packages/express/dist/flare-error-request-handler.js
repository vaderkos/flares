"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlareMiddleware = exports.FlareErrorRequestHandler = void 0;
const core_1 = require("@flares/core");
const express_toolkit_1 = require("./express-toolkit");
function FlareErrorRequestHandler(options) {
    var _a, _b;
    const { wrapNonFlare } = options;
    const mapFlare = (_a = options.mapFlare) !== null && _a !== void 0 ? _a : (_ => _);
    const mapResponseBody = (_b = options.mapResponseBody) !== null && _b !== void 0 ? _b : core_1.SerializableFlare;
    return express_toolkit_1.AsyncErrorRequestHandler((err, _req, res, next) => __awaiter(this, void 0, void 0, function* () {
        if (!core_1.isFlare(err) && !wrapNonFlare) {
            next(err);
            return;
        }
        err = core_1.isFlare(err)
            ? err
            : yield wrapNonFlare(err);
        const flare = yield mapFlare(err);
        res
            .status(flare.statusCode)
            .send(yield mapResponseBody(flare));
    }));
}
exports.FlareErrorRequestHandler = FlareErrorRequestHandler;
exports.FlareMiddleware = FlareErrorRequestHandler;
//# sourceMappingURL=flare-error-request-handler.js.map