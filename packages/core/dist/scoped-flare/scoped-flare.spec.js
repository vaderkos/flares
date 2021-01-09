"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const scoped_flare_1 = require("./scoped-flare");
mocha_1.describe('ScopedFlare', () => {
    const dummyCode = 0;
    const dummyText = 'Dummy text';
    const newDummy = () => new scoped_flare_1.ScopedFlare(dummyCode, dummyText);
    const callDummy = () => scoped_flare_1.ScopedFlare(dummyCode, dummyText);
    mocha_1.describe('ScopedFlare()', () => {
        mocha_1.it('Should bew newable', () => {
            chai_1.expect(newDummy()).instanceof(scoped_flare_1.ScopedFlare);
        });
        mocha_1.it('Should be callable', () => {
            chai_1.expect(callDummy()).instanceof(scoped_flare_1.ScopedFlare);
        });
        mocha_1.it('Should be possible to inherit', () => {
            class Given extends scoped_flare_1.ScopedFlare {
            }
            const given = new Given(0, '');
            chai_1.expect(given).instanceof(Given);
            chai_1.expect(given).instanceof(scoped_flare_1.ScopedFlare);
        });
        mocha_1.describe('Allow any arguments order passed to instance of ScopedFlare', () => {
            class DummyError extends Error {
            }
            const message = 'Dummy message';
            const data = { dummy: 'data' };
            const cause = new DummyError();
            const dummyScopedFlare = new scoped_flare_1.ScopedFlare(dummyCode, dummyText);
            const cases = {
                'message': { args: [message], result: [message, {}, null] },
                'message, data': { args: [message, data], result: [message, data, null] },
                'message, data, cause': { args: [message, data, cause], result: [message, data, cause] },
                'message, cause': { args: [message, cause], result: [message, {}, cause] },
                'message, cause, Data': { args: [message, cause, data], result: [message, data, cause] },
                'data': { args: [data], result: ['', data, null] },
                'data, message': { args: [data, message], result: [message, data, null] },
                'data, message, cause': { args: [data, message, cause], result: [message, data, cause] },
                'data, cause': { args: [data, cause], result: ['', data, cause] },
                'data, cause, message': { args: [data, cause, message], result: [message, data, cause] },
                'cause': { args: [cause], result: ['', {}, cause] },
                'cause, message': { args: [cause, message], result: [message, {}, cause] },
                'cause, message, data': { args: [cause, message, data], result: [message, data, cause] },
                'cause, data': { args: [cause, data], result: ['', data, cause] },
                'cause, data, message': { args: [cause, data, message], result: [message, data, cause] },
            };
            const isEmptyObject = (obj) => Object.keys(obj).length === 0;
            for (const [argsDefinition, { args, result }] of Object.entries(cases)) {
                mocha_1.it(`new ScopedFlare(statusCode, statusText)(${argsDefinition})`, () => {
                    const flare = dummyScopedFlare(...args);
                    dummyScopedFlare('adsasd');
                    const [message, data, cause] = result;
                    if (isEmptyObject(data)) {
                        chai_1.expect(isEmptyObject(flare.data)).to.be.true;
                    }
                    else {
                        chai_1.expect(flare.data).equals(data);
                    }
                    chai_1.expect(flare).to.deep.include({ message, cause });
                });
            }
        });
    });
    mocha_1.describe('ScopedFlare instance', () => {
        mocha_1.it('Should be of function type', () => {
            chai_1.expect(newDummy()).to.be.a('function');
        });
        mocha_1.it('Should be instance of Function', () => {
            chai_1.expect(newDummy()).instanceof(Function);
        });
        mocha_1.it('Should be instance of ScopedFlare', () => {
            chai_1.expect(newDummy()).instanceof(scoped_flare_1.ScopedFlare);
        });
        mocha_1.it('Should have properly assigned statusCode and statusText', () => {
            chai_1.expect(newDummy()).to.deep.include({
                statusCode: dummyCode,
                statusText: dummyText
            });
        });
        mocha_1.it('Should have properly generated properties', () => {
            const { name } = newDummy();
            chai_1.expect(name).to.be.a('string');
            chai_1.expect(name).length.greaterThan(0);
        });
    });
    mocha_1.describe('ScopedFlare.prototype.name', () => {
        mocha_1.it('Should have proper value', () => {
            chai_1.expect(newDummy()).to.deep.include({
                name: `ScopedFlare<${dummyCode}, "${dummyText}">`
            });
        });
        mocha_1.it('Should have proper value for instance of inherited', () => {
            class Given extends scoped_flare_1.ScopedFlare {
            }
            chai_1.expect(new Given(dummyCode, dummyText)).to.deep.include({
                name: `${Given.name}<${dummyCode}, "${dummyText}">`
            });
        });
    });
    mocha_1.describe('ScopedFlare produced Flare instance', () => {
        mocha_1.it('Should have proper stacktrace without ScopedFlare constructor when is callable', () => {
            const { stack } = callDummy()();
            chai_1.expect(stack.split('\n')[1].includes('ScopedFlare.')).to.be.false;
        });
        mocha_1.it('Should have proper stacktrace without ScopedFlare constructor when is newable', () => {
            const { stack } = newDummy()();
            chai_1.expect(stack.split('\n')[1].includes('ScopedFlare.')).to.be.false;
        });
        mocha_1.it('Should have proper stacktrace without inherited ScopedFlare constructor', () => {
            class Given extends scoped_flare_1.ScopedFlare {
            }
            const { stack } = (new Given(0, ''))();
            const firstTraceLine = stack.split('\n')[1];
            chai_1.expect(firstTraceLine.includes('ScopedFlare.')).to.be.false;
            chai_1.expect(firstTraceLine.includes('Flare.')).to.be.false;
            chai_1.expect(firstTraceLine.includes('Given.')).to.be.false;
        });
    });
    mocha_1.describe('ScopedFlare.isScopedFlare()', () => {
        mocha_1.it('Should be of ScopedFlare type', () => {
            chai_1.expect(scoped_flare_1.ScopedFlare.isScopedFlare(newDummy())).to.be.true;
            chai_1.expect(scoped_flare_1.ScopedFlare.isScopedFlare(callDummy())).to.be.true;
        });
        mocha_1.it('Should not be of ScopedFlare type', () => {
            /* Object.create gives you a variable of object primitive type so it cannot be callable */
            const given = Object.create(scoped_flare_1.ScopedFlare.prototype);
            chai_1.expect(scoped_flare_1.ScopedFlare.isScopedFlare(given)).to.be.false;
        });
    });
});
//# sourceMappingURL=scoped-flare.spec.js.map