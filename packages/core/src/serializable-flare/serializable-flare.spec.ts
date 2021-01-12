import { describe, it } from 'mocha'
import { expect } from 'chai'

import { Flare } from '../flare'

import { SerializableFlare } from './serializable-flare'

describe('SerializableFlare', () => {
    it('Should convert to null', () => {
        expect(SerializableFlare(null)).equals(null)
        expect(SerializableFlare(undefined)).equals(null)
    })

    it('Should convert to object with structure similar to Error', () => {
        const given = new Error('test')

        const ser = SerializableFlare(given)

        expect(ser).to.include.all.keys(
            'name',
            'message',
            'stack',
            'cause'
        )
        expect(ser).to.not.include.any.keys(
            'statusCode',
            'statusText',
            'data'
        )
    })

    it('Should convert to object with structure similar to Flare', () => {
        const given = new Flare(0, '')

        const ser = SerializableFlare(given)

        expect(ser).to.include.all.keys(
            'name',
            'stack',
            'statusCode',
            'statusText',
            'message',
            'data',
            'cause'
        )
    })

    it('Should properly convert cause Error recursively', () => {
        const given = new Error('test') as Error & { cause: Error }
        given.cause = new SyntaxError()

        const ser = SerializableFlare(given)

        expect(ser).to.include.all.keys(
            'name',
            'message',
            'stack',
            'cause'
        )
        expect(ser).to.not.include.any.keys(
            'statusCode',
            'statusText',
            'data'
        )

        expect(ser?.cause).to.include.all.keys(
            'name',
            'message',
            'stack',
            'cause'
        )

        expect(ser?.cause).to.not.include.any.keys(
            'statusCode',
            'statusText',
            'data'
        )

    })

    it('Should properly convert customer Error with extra properties', () => {
        const err = new Error() as Error & { visible: number; hidden: number }

        err.visible = 1

        Object.defineProperty(err, 'hidden', {
            enumerable: false,
            value: 2
        })

        const sf = SerializableFlare(err)

        expect(sf).to.include.all.keys(
            'visible',
            'name',
            'message',
            'stack',
            'cause'
        )

        expect(sf).to.not.include.any.keys('hidden')
    })
})