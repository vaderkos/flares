"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const code_statuses_1 = require("./code-statuses");
mocha_1.describe('CodeStatuses object', () => {
    mocha_1.it('Should include official status codes', () => {
        chai_1.expect(code_statuses_1.CodeStatuses).to.include.all.keys([
            100, 101, 102, 103,
            200, 201, 202, 203, 204, 205, 206, 207, 208, 226,
            300, 301, 302, 303, 304, 305, 306, 307, 308,
            400, 401, 402, 403, 404, 405, 406, 407, 408,
            409, 410, 411, 412, 413, 414, 415, 416, 417,
            418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451,
            500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511
        ]);
    });
});
//# sourceMappingURL=code-statuses.spec.js.map