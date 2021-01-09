"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const flare_1 = require("../flare");
const serializable_flare_1 = require("./serializable-flare");
mocha_1.describe('SerializableFlare', () => {
    mocha_1.it('Should convert to null', () => {
        chai_1.expect(serializable_flare_1.SerializableFlare(null)).equals(null);
        chai_1.expect(serializable_flare_1.SerializableFlare(undefined)).equals(null);
    });
    mocha_1.it('Should convert to object with structure similar to Error', () => {
        const given = new Error('test');
        const ser = serializable_flare_1.SerializableFlare(given);
        chai_1.expect(ser).to.include.all.keys('name', 'message', 'stack', 'cause');
        chai_1.expect(ser).to.not.include.all.keys('statusCode', 'statusText', 'data');
    });
    mocha_1.it('Should convert to object with structure similar to Flare', () => {
        const given = new flare_1.Flare(0, '');
        const ser = serializable_flare_1.SerializableFlare(given);
        chai_1.expect(ser).to.include.all.keys('name', 'stack', 'statusCode', 'statusText', 'message', 'data', 'cause');
    });
    mocha_1.it('Should properly convert cause Error recursively', () => {
        const given = new Error('test');
        given.cause = new SyntaxError();
        const ser = serializable_flare_1.SerializableFlare(given);
        chai_1.expect(ser).to.include.all.keys('name', 'message', 'stack', 'cause');
        chai_1.expect(ser).to.not.include.all.keys('statusCode', 'statusText', 'data');
        chai_1.expect(ser === null || ser === void 0 ? void 0 : ser.cause).to.include.all.keys('name', 'message', 'stack', 'cause');
        chai_1.expect(ser === null || ser === void 0 ? void 0 : ser.cause).to.not.include.all.keys('statusCode', 'statusText', 'data');
    });
    mocha_1.describe('Usage with JSON.stringify()', () => {
    });
});
//# sourceMappingURL=serializable-flare.spec.js.map