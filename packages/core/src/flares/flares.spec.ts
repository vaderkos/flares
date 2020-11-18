import { describe, it } from 'mocha'
import {  expect } from 'chai'

import { ScopedFlare } from '../scoped-flare'

import { Flares } from './flares'

describe('Flares', () => {
    const dummyStatuses = {
        zero: [0, 'zero'],
        one:  [1, 'one'],
        two:  [2, 'two']
    } as const

    const newDummy = () => new Flares(dummyStatuses)
    const callDummy = () => Flares(dummyStatuses)

    describe('Flares()', () => {
        it('Should be callable', () => {
            expect(callDummy()).instanceof(Flares)
        })

        it('Should be newable', () => {
            expect(newDummy()).instanceof(Flares)
        })
    })

    describe('Flares instance', () => {
        it('Should be of object type', () => {
            expect(newDummy()).to.be.an('object')
        })

        it('Should be instance of Flares', () => {
            expect(newDummy()).instanceof(Flares)
        })
    })

    describe('Flares.isFlares()', () => {
        it('Should be of Flares type', () => {
            expect(Flares.isFlares(newDummy())).to.be.true

            expect(Flares.isFlares(Flares({}))).to.be.true

            expect(Flares.isFlares(Object.create(Flares.prototype))).to.be.true

            expect(Flares.isFlares({
                zero: ScopedFlare(0, '')
            })).to.be.true

        })

        it('Should not be of Flares type', () => {
            expect(Flares.isFlares({
                other: 'other',
                zero: ScopedFlare(0, '')
            })).to.be.false
        })
    })
})





