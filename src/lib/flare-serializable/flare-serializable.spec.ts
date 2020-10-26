import { describe, it } from 'mocha'
import { expect } from 'chai'

import { Flare } from '../flare'

import { FlareSerializable } from './flare-serializable'

describe('FlareSerializable', () => {
    it('Should convert to null', () => {
        expect(FlareSerializable(null)).equals(null)
        expect(FlareSerializable(undefined)).equals(null)
    })

    it('Should convert to object with structure similar to Error', () => {
        const given = new Error('test')

        const ser = FlareSerializable(given)

        expect(ser).to.include.all.keys(
            'name',
            'message',
            'stack',
            'cause'
        )
        expect(ser).to.not.include.all.keys(
            'statusCode',
            'statusText',
            'data'
        )
    })

    it('Should convert to object with structure similar to Flare', () => {
        const given = new Flare(0, '')

        const ser = FlareSerializable(given)

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

    it('Should properly convert Error recursively when cause exists', () => {
        const given = new Error('test') as Error & { cause: Error }
        given.cause = new SyntaxError()

        const ser = FlareSerializable(given)

        expect(ser).to.include.all.keys(
            'name',
            'message',
            'stack',
            'cause'
        )
        expect(ser).to.not.include.all.keys(
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

        expect(ser?.cause).to.not.include.all.keys(
            'statusCode',
            'statusText',
            'data'
        )

    })
})