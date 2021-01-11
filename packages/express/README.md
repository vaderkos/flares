# @flares/express

This package is intended to use with packages that are compatible with `@flares/core` like:

* [```@flares/camel-case-flares```](https://www.npmjs.com/package/@flares/camel-case-flares)
* [```@flares/camel-case-code-flares```](https://www.npmjs.com/package/@flares/camel-case-code-flares)
* [```@flares/pascal-case-flares```](https://www.npmjs.com/package/@flares/pascal-case-flares)
* [```@flares/pascal-case-code-flares```](https://www.npmjs.com/package/@flares/pascal-case-code-flares)

## Basic Usage

```ts
import express from 'express'
import { FlareErrorRequestHandler, ThrowErrorRequestHandler } from '@flare/express'

// You can use any cased package to meet your code style in project
import { NotFound404, Internal500, Fls } from '@flares/pascal-case-code-flares'

const app = express()

app.get('/not-found', ThrowErrorRequestHandler(NotFound404()))

app.get('/forbidden', (req, res, next) => {
    throw Fls.Forbidden403('My message', e)
})

app.get('/forbidden', (req, res, next) => {
    try {
        throw new Error('Cause')
    } catch (e) {
        throw new Internal500('My custom message', e, { timestamp: Date.now() })
    }
})

app.get('/wrap-non-flare', () => {
    throw new Error('Not flare error')
})

app.use(FlareErrorRequestHandler({
    onServerFlare: console.error,
    wrapNonFlare: Internal500
}))


app.listen(8000)

```