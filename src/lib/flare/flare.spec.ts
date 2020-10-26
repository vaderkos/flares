import { describe, it } from 'mocha'
import { expect } from 'chai'

import { Nullable } from '../toolkit'
import { Flare } from './flare'

describe('Flare', () => {

    const dummyCode = 0 as const
    const dummyText = 'Dummy text' as const

    const newDummy = () => new Flare(dummyCode, dummyText)
    const callDummy = () => Flare(dummyCode, dummyText)

    describe('Flare()', () => {
        it('Should be callable', () => {
            expect(callDummy()).instanceof(Flare)
        })

        it('Should be newable', () => {
            expect(newDummy()).instanceof(Flare)
        })

        it('Should be possible to inherit', () => {
            class Given<SC extends number, ST extends string> extends Flare<SC, ST, string, object, Nullable<Error>> {}

            const given = new Given(0, '')

            expect(given).instanceof(Given)
            expect(given).instanceof(Flare)
            expect(given).instanceof(Error)
        })

        describe('Allow any arguments order after StatusCode and StatusText', () => {
            class DummyError extends Error {}

            const message = 'Dummy message'
            const data = { dummy: 'data' }
            const cause = new DummyError()

            const cases = {
                'message':              { args: [message],               result: [message, {}, null]    },
                'message, data':        { args: [message, data],         result: [message, data, null]  },
                'message, data, cause': { args: [message, data, cause],  result: [message, data, cause] },
                'message, cause':       { args: [message, cause],        result: [message, {}, cause]   },
                'message, cause, Data': { args: [message, cause, data],  result: [message, data, cause] },
                'data':                 { args: [data],                  result: ['', data, null]       },
                'data, message':        { args: [data, message],         result: [message, data, null]  },
                'data, message, cause': { args: [data, message, cause],  result: [message, data, cause] },
                'data, cause':          { args: [data, cause],           result: ['', data, cause]      },
                'data, cause, message': { args: [data, cause, message],  result: [message, data, cause] },
                'cause':                { args: [cause],                 result: ['', {}, cause]        },
                'cause, message':       { args: [cause, message],        result: [message, {}, cause]   },
                'cause, message, data': { args: [cause, message, data],  result: [message, data, cause] },
                'cause, data':          { args: [cause, data],           result: ['', data, cause]      },
                'cause, data, message': { args: [cause, data, message],  result: [message, data, cause] },
            } as const

            const isEmptyObject = (obj: object): boolean => Object.keys(obj).length === 0

            for (const [argsDefinition, { args, result }] of Object.entries(cases)) {
                it(`new Flare(statusCode, statusText, ${argsDefinition})`, () => {
                    const flare = new (Flare as any)(dummyCode, dummyText, ...args)

                    const [message, data, cause] = result

                    if (isEmptyObject(data)) {
                        expect(isEmptyObject(flare.data)).to.be.true
                    } else {
                        expect(flare.data).equals(data)
                    }

                    expect(flare).to.deep.include({ message, cause })
                })
            }
        })
    })

    describe('Flare instance', () => {
        it('Should inherit Flare', () => {
            expect(newDummy()).instanceof(Flare)
        })

        it('Should inherit Error', () => {
            expect(newDummy()).instanceof(Error)
        })

        it('Should have properly assigned statusCode and statusText', () => {
            const given = newDummy()

            expect(given.statusCode).equals(dummyCode)
            expect(given.statusText).equals(dummyText)
        })

        it('Should have proper defaults', () => {
            const given = newDummy()

            expect(given).to.deep.include({
                message: '',
                cause: null,
                data: {}
            })
        })

        it('Should have proper generated properties', () => {
            const { stack, name } = newDummy()

            expect(stack).to.be.a('string')
            expect(name).to.be.a('string')

            expect(stack).length.greaterThan(0)
            expect(name).length.greaterThan(0)
        })
    })

    describe('Flare.prototype', () => {
        it('Has all required default properties', () => {
            const given = Object.create(Flare.prototype)

            expect(given).to.be.an('object')
            expect(given.name).to.be.a('string')
            expect(given.message).to.be.a('string')
            expect(given.stack).to.be.a('string')
            expect(given.statusCode).to.be.a('number')
            expect(given.statusText).to.be.a('string')
            expect(given.data).to.be.an('object')
            expect(given.cause).to.be.a('null')
        })
    })

    describe('Flare.prototype.name', () => {
        const getDummyName = (message: string, data: string, cause: string) =>
            `Flare<${dummyCode}, "${dummyText}", ${message}, ${data}, ${cause}>`

        it('Flare instance with defaults', () => {
            const { name } = newDummy()

            expect(name).equals(getDummyName('""', '{}', 'null'))
        })

        it('Flare instance with cause', () => {
            const given = new SyntaxError()
            const { name } = new Flare(dummyCode, dummyText, given)

            expect(name).equals(getDummyName('""', '{}', given.name))
        })

        it('Flare instance with message', () => {
            const given = 'text'
            const { name } = new Flare(dummyCode, dummyText, given)

            expect(name).equals(getDummyName('string', '{}', 'null'))
        })

        it('Flare instance with data of anonymous object type', () => {
            const given = { test: 1 }
            const { name } = new Flare(dummyCode, dummyText, given)

            expect(name).equals(getDummyName('""', 'object', 'null'))
        })

        it('Flare instance with data of Object.create(null)', () => {
            const given = Object.create(null)
            const { name } = new Flare(dummyCode, dummyText, given)

            expect(name).equals(getDummyName('""', 'object', 'null'))
        })

        it('Flare instance with data of some type', () => {
            class Given {}
            const { name } = new Flare(dummyCode, dummyText, new Given())

            expect(name).equals(getDummyName('""', Given.name, 'null'))
        })

        it('Flare instance with exact message, data and cause', () => {
            class Data {}
            const data = new Data()
            const message = 'text'
            const cause = new TypeError()

            const { name } = new Flare(dummyCode, dummyText, data, message, cause)

            expect(name).equals(getDummyName('string', Data.name, cause.name))
        })
    })

    describe('Flare.prototype.stack', () => {
        it('Should have proper stacktrace without constructor when is callable', () => {
            const { stack } = callDummy()

            expect(stack.split('\n')[1].includes('Flare.')).to.be.false
        })

        it('Should have proper stacktrace without constructor when is newable', () => {
            const { stack } = newDummy()

            expect(stack.split('\n')[1].includes('Flare.')).to.be.false
        })

        it('Should have proper stacktrace without constructor when inherited', () => {
            class Given extends Flare<number, string, string, object, Error> {}

            const { stack } = new Given(0, '')

            const firstTraceLine = stack.split('\n')[1]

            expect(firstTraceLine.includes('Flare.')).to.be.false
            expect(firstTraceLine.includes('Given.')).to.be.false
        })
    })

    describe('Flare static methods', () => {
        const decline = [undefined, 99999, Symbol('test'), class T {}, function T () {}, () => undefined]

        const test = <A extends any[], D extends any[]>(
            is: (value: A[keyof A]) => boolean,
            decline: D,
            accept: A
        ) => {
            const name = is.name
            const type = is.name.replace(/^is/, '')

            describe(`Flare.${name}()`, () => {
                it(`Should be of ${type} type`, () => accept.forEach(
                    value => expect(is(value)).to.be.true
                ))
                it(`Should not be of ${type} type`, () => decline.forEach(
                    value => expect(is(value)).to.be.false
                ))
            })
        }

        test(Flare.isMessage, decline, ['', 'text'])
        test(Flare.isCause, decline, [null, new Error(), new SyntaxError(), new (class E extends Error {})()])
        test(Flare.isData, decline, [{}, { a: 1 }, [], [1, 2, 3], new (class T {})()])

        test(Flare.isFlare, decline, [
            newDummy(),
            callDummy(),
            Object.create(Flare.prototype),
            Flare.call(Object.create(Flare.prototype), dummyCode, dummyText)
        ])
    })
})