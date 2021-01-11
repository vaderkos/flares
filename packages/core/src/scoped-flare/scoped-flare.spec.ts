import { describe, it } from 'mocha'
import { expect } from 'chai'

import { ScopedFlare } from './scoped-flare'

describe('ScopedFlare', () => {
    const dummyCode = 0
    const dummyText = 'Dummy text'

    const newDummy = () => new ScopedFlare(dummyCode, dummyText)
    const callDummy = () => ScopedFlare(dummyCode, dummyText)

    describe('ScopedFlare()', () => {
        it('Should be newable', () => {
            expect(newDummy()).instanceof(ScopedFlare)
        })

        it('Should be callable', () => {
            expect(callDummy()).instanceof(ScopedFlare)
        })

        it('Should be possible to inherit', () => {
            class Given<SC extends number, ST extends string> extends ScopedFlare<SC, ST> {}

            const given = new Given(0, '')

            expect(given).instanceof(Given)
            expect(given).instanceof(ScopedFlare)
        })

        describe('Allow any arguments order passed to instance of ScopedFlare', () => {
            class DummyError extends Error {}

            const message = 'Dummy message'
            const data = { dummy: 'data' }
            const cause = new DummyError()

            const dummyScopedFlare = new ScopedFlare(dummyCode, dummyText)

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
                it(`new ScopedFlare(statusCode, statusText)(${argsDefinition})`, () => {
                    const flare = (dummyScopedFlare as any)(...args)

                    dummyScopedFlare('adsasd')

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

    describe('ScopedFlare instance', () => {

        it('Should be of function type', () => {
            expect(newDummy()).to.be.a('function')
        })

        it('Should be instance of Function', () => {
            expect(newDummy()).instanceof(Function)
        })

        it('Should be instance of ScopedFlare', () => {
            expect(newDummy()).instanceof(ScopedFlare)
        })

        it('Should have properly assigned statusCode and statusText', () => {
            expect(newDummy()).to.deep.include({
                statusCode: dummyCode,
                statusText: dummyText
            })
        })

        it('Should have properly generated properties', () => {
            const { name } = newDummy()

            expect(name).to.be.a('string')
            expect(name).length.greaterThan(0)
        })

    })

    describe('ScopedFlare.prototype.name', () => {

        it('Should have proper value', () => {
            expect(newDummy()).to.deep.include({
                name: `ScopedFlare<${dummyCode}, "${dummyText}">`
            })
        })

        it('Should have proper value for instance of inherited', () => {
            class Given extends ScopedFlare<typeof dummyCode, typeof dummyText> {}

            expect(new Given(dummyCode, dummyText)).to.deep.include({
                name: `${Given.name}<${dummyCode}, "${dummyText}">`
            })
        })

    })

    describe('ScopedFlare produced Flare instance', () => {
        it('Should have proper stacktrace without ScopedFlare constructor when is callable', () => {
            const { stack } = callDummy()()

            expect(stack.split('\n')[1].includes('ScopedFlare.')).to.be.false
        })

        it('Should have proper stacktrace without ScopedFlare constructor when is newable', () => {
            const { stack } = newDummy()()

            expect(stack.split('\n')[1].includes('ScopedFlare.')).to.be.false
        })

        it('Should have proper stacktrace without inherited ScopedFlare constructor', () => {
            class Given extends ScopedFlare<number, string> {}

            const { stack } = (new Given(0, ''))()

            const firstTraceLine = stack.split('\n')[1]

            expect(firstTraceLine.includes('ScopedFlare.')).to.be.false
            expect(firstTraceLine.includes('Flare.')).to.be.false
            expect(firstTraceLine.includes('Given.')).to.be.false
        })
    })

    describe('ScopedFlare.isScopedFlare()', () => {
        it('Should be of ScopedFlare type', () => {
            expect(ScopedFlare.isScopedFlare(newDummy())).to.be.true
            expect(ScopedFlare.isScopedFlare(callDummy())).to.be.true
        })

        it('Should not be of ScopedFlare type', () => {
            /* Object.create gives you a variable of object primitive type so it cannot be callable */
            const given = Object.create(ScopedFlare.prototype)

            expect(ScopedFlare.isScopedFlare(given)).to.be.false
        })
    })
})