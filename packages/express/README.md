# @flares/express

This package is intended to use with packages that are compatible with `@flares/core` like:

* [```@flares/camel-case-flares```](https://www.npmjs.com/package/@flares/camel-case-flares)
* [```@flares/camel-case-code-flares```](https://www.npmjs.com/package/@flares/camel-case-code-flares)
* [```@flares/pascal-case-flares```](https://www.npmjs.com/package/@flares/pascal-case-flares)
* [```@flares/pascal-case-code-flares```](https://www.npmjs.com/package/@flares/pascal-case-code-flares)

```ts
import express from 'express'
import { FlareErrorRequestHandler, ThrowErrorRequestHandler } from '@flare/express'
import { NotFound404, Internal500 } from '@flares/pascal-case-code-flares'

const app = express()

app.get('/get404', ThrowErrorRequestHandler(NotFound404()))

app.get('/test', (req, res, next) => {
    throw new Internal500('My custom message')
})

app.use(FlareErrorRequestHandler({}))

app.listen(8000)

```