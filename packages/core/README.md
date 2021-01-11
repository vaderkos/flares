# 🧨🔥 Flares  - Typescript friendly status code library 


## Integrations
- express 

## Installation
Available at yarn and npm
```bash
$ npm install @flares/core
$ yarn add @flares/core
```

## Basic Flare Usage

```ts
const message = 'My message'
const data = { extra: 1 }
const cause = new Error('This is the cause')

throw new Flare(403, 'Forbidden', message, data, cause)
throw Flare(403, 'Forbidden', message, data, cause)
```

<details>
    <summary>Flare</summary>

```ts

const message = 'My message'
const data = { extra: 1 }
const cause = new Error('This error is the cause')

// Everything below is correct

throw new Flare(403, 'Forbidden', message)
throw new Flare(403, 'Forbidden', message, data)
throw new Flare(403, 'Forbidden', message, cause)
throw new Flare(403, 'Forbidden', message, data, cause)
throw new Flare(403, 'Forbidden', message, cause, data)

throw new Flare(403, 'Forbidden', data)
throw new Flare(403, 'Forbidden', data, message)
throw new Flare(403, 'Forbidden', data, cause)
throw new Flare(403, 'Forbidden', data, message, cause)
throw new Flare(403, 'Forbidden', data, cause, message)

throw new Flare(403, 'Forbidden', cause)
throw new Flare(403, 'Forbidden', cause, message)
throw new Flare(403, 'Forbidden', cause, data)
throw new Flare(403, 'Forbidden', cause, message, data)
throw new Flare(403, 'Forbidden', cause, data, message)

throw Flare(403, 'Forbidden', message)
throw Flare(403, 'Forbidden', message, data)
throw Flare(403, 'Forbidden', message, cause)
throw Flare(403, 'Forbidden', message, data, cause)
throw Flare(403, 'Forbidden', message, cause, data)

throw Flare(403, 'Forbidden', data)
throw Flare(403, 'Forbidden', data, message)
throw Flare(403, 'Forbidden', data, cause)
throw Flare(403, 'Forbidden', data, message, cause)
throw Flare(403, 'Forbidden', data, cause, message)

throw Flare(403, 'Forbidden', cause)
throw Flare(403, 'Forbidden', cause, message)
throw Flare(403, 'Forbidden', cause, data)
throw Flare(403, 'Forbidden', cause, message, data)
throw Flare(403, 'Forbidden', cause, data, message)

```
</details>
