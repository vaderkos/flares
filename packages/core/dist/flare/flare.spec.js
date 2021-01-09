"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const flare_1 = require("./flare");
mocha_1.describe('Flare', () => {
    const dummyCode = 0;
    const dummyText = 'Dummy text';
    const newDummy = () => new flare_1.Flare(dummyCode, dummyText);
    const callDummy = () => flare_1.Flare(dummyCode, dummyText);
    mocha_1.describe('Flare()', () => {
        mocha_1.it('Should be callable', () => {
            chai_1.expect(callDummy()).instanceof(flare_1.Flare);
        });
        mocha_1.it('Should be newable', () => {
            chai_1.expect(newDummy()).instanceof(flare_1.Flare);
        });
        mocha_1.it('Should be possible to inherit', () => {
            class Given extends flare_1.Flare {
            }
            const given = new Given(0, '');
            chai_1.expect(given).instanceof(Given);
            chai_1.expect(given).instanceof(flare_1.Flare);
            chai_1.expect(given).instanceof(Error);
        });
        mocha_1.describe('Allow any arguments order after StatusCode and StatusText', () => {
            class DummyError extends Error {
            }
            const message = 'Dummy message';
            const data = { dummy: 'data' };
            const cause = new DummyError();
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
                mocha_1.it(`new Flare(statusCode, statusText, ${argsDefinition})`, () => {
                    const flare = new flare_1.Flare(dummyCode, dummyText, ...args);
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
    mocha_1.describe('Flare instance', () => {
        mocha_1.it('Should inherit Flare', () => {
            chai_1.expect(newDummy()).instanceof(flare_1.Flare);
        });
        mocha_1.it('Should inherit Error', () => {
            chai_1.expect(newDummy()).instanceof(Error);
        });
        mocha_1.it('Should have properly assigned statusCode and statusText', () => {
            const given = newDummy();
            chai_1.expect(given.statusCode).equals(dummyCode);
            chai_1.expect(given.statusText).equals(dummyText);
        });
        mocha_1.it('Should have proper defaults', () => {
            const given = newDummy();
            chai_1.expect(given).to.deep.include({
                message: '',
                cause: null,
                data: {}
            });
        });
        mocha_1.it('Should have proper generated properties', () => {
            const { stack, name } = newDummy();
            chai_1.expect(stack).to.be.a('string');
            chai_1.expect(name).to.be.a('string');
            chai_1.expect(stack).length.greaterThan(0);
            chai_1.expect(name).length.greaterThan(0);
        });
    });
    mocha_1.describe('Flare.prototype.name', () => {
        const getDummyName = (message, data, cause) => `Flare<${dummyCode}, "${dummyText}", ${message}, ${data}, ${cause}>`;
        mocha_1.it('Flare instance with defaults', () => {
            const { name } = newDummy();
            chai_1.expect(name).equals(getDummyName('""', '{}', 'null'));
        });
        mocha_1.it('Flare instance with cause', () => {
            const given = new SyntaxError();
            const { name } = new flare_1.Flare(dummyCode, dummyText, given);
            chai_1.expect(name).equals(getDummyName('""', '{}', given.name));
        });
        mocha_1.it('Flare instance with message', () => {
            const given = 'text';
            const { name } = new flare_1.Flare(dummyCode, dummyText, given);
            chai_1.expect(name).equals(getDummyName('string', '{}', 'null'));
        });
        mocha_1.it('Flare instance with data of anonymous object type', () => {
            const given = { test: 1 };
            const { name } = new flare_1.Flare(dummyCode, dummyText, given);
            chai_1.expect(name).equals(getDummyName('""', 'object', 'null'));
        });
        mocha_1.it('Flare instance with data of Object.create(null)', () => {
            const given = Object.create(null);
            const { name } = new flare_1.Flare(dummyCode, dummyText, given);
            chai_1.expect(name).equals(getDummyName('""', 'object', 'null'));
        });
        mocha_1.it('Flare instance with data of some type', () => {
            class Given {
            }
            const { name } = new flare_1.Flare(dummyCode, dummyText, new Given());
            chai_1.expect(name).equals(getDummyName('""', Given.name, 'null'));
        });
        mocha_1.it('Flare instance with exact message, data and cause', () => {
            class Data {
            }
            const data = new Data();
            const message = 'text';
            const cause = new TypeError();
            const { name } = new flare_1.Flare(dummyCode, dummyText, data, message, cause);
            chai_1.expect(name).equals(getDummyName('string', Data.name, cause.name));
        });
    });
    mocha_1.describe('Flare.prototype.stack', () => {
        mocha_1.it('Should have proper stacktrace without constructor when is callable', () => {
            const { stack } = callDummy();
            chai_1.expect(stack.split('\n')[1].includes('Flare.')).to.be.false;
        });
        mocha_1.it('Should have proper stacktrace without constructor when is newable', () => {
            const { stack } = newDummy();
            chai_1.expect(stack.split('\n')[1].includes('Flare.')).to.be.false;
        });
        mocha_1.it('Should have proper stacktrace without constructor when inherited', () => {
            class Given extends flare_1.Flare {
            }
            const { stack } = new Given(0, '');
            const firstTraceLine = stack.split('\n')[1];
            chai_1.expect(firstTraceLine.includes('Flare.')).to.be.false;
            chai_1.expect(firstTraceLine.includes('Given.')).to.be.false;
        });
    });
    mocha_1.describe('Flare static methods', () => {
        const decline = [undefined, 99999, Symbol('test'), class T {
            }, function T() { }, () => undefined];
        const test = (is, decline, accept) => {
            const name = is.name;
            const type = is.name.replace(/^is/, '');
            mocha_1.describe(`Flare.${name}()`, () => {
                mocha_1.it(`Should be of ${type} type`, () => accept.forEach(value => chai_1.expect(is(value)).to.be.true));
                mocha_1.it(`Should not be of ${type} type`, () => decline.forEach(value => chai_1.expect(is(value)).to.be.false));
            });
        };
        test(flare_1.Flare.isMessage, decline, ['', 'text']);
        test(flare_1.Flare.isCause, decline, [null, new Error(), new SyntaxError(), new (class E extends Error {
            })()]);
        test(flare_1.Flare.isData, decline, [{}, { a: 1 }, [], [1, 2, 3], new (class T {
            })()]);
        test(flare_1.Flare.isFlare, decline, [
            newDummy(),
            callDummy(),
            Object.create(flare_1.Flare.prototype),
            flare_1.Flare.call(Object.create(flare_1.Flare.prototype), dummyCode, dummyText)
        ]);
    });
});
//# sourceMappingURL=flare.spec.js.map