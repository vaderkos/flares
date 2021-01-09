"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const scoped_flare_1 = require("../scoped-flare");
const flares_1 = require("./flares");
mocha_1.describe('Flares', () => {
    const dummyStatuses = {
        zero: [0, 'zero'],
        one: [1, 'one'],
        two: [2, 'two']
    };
    const newDummy = () => new flares_1.Flares(dummyStatuses);
    const callDummy = () => flares_1.Flares(dummyStatuses);
    mocha_1.describe('Flares()', () => {
        mocha_1.it('Should be callable', () => {
            chai_1.expect(callDummy()).instanceof(flares_1.Flares);
        });
        mocha_1.it('Should be newable', () => {
            chai_1.expect(newDummy()).instanceof(flares_1.Flares);
        });
    });
    mocha_1.describe('Flares instance', () => {
        mocha_1.it('Should be of object type', () => {
            chai_1.expect(newDummy()).to.be.an('object');
        });
        mocha_1.it('Should be instance of Flares', () => {
            chai_1.expect(newDummy()).instanceof(flares_1.Flares);
        });
    });
    mocha_1.describe('Flares.isFlares()', () => {
        mocha_1.it('Should be of Flares type', () => {
            chai_1.expect(flares_1.Flares.isFlares(newDummy())).to.be.true;
            chai_1.expect(flares_1.Flares.isFlares(flares_1.Flares({}))).to.be.true;
            chai_1.expect(flares_1.Flares.isFlares(Object.create(flares_1.Flares.prototype))).to.be.true;
            chai_1.expect(flares_1.Flares.isFlares({
                zero: scoped_flare_1.ScopedFlare(0, '')
            })).to.be.true;
        });
        mocha_1.it('Should not be of Flares type', () => {
            chai_1.expect(flares_1.Flares.isFlares({
                other: 'other',
                zero: scoped_flare_1.ScopedFlare(0, '')
            })).to.be.false;
        });
    });
});
//# sourceMappingURL=flares.spec.js.map