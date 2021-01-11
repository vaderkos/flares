# 🧨🔥 Flares  - Typescript friendly status code library 


## Integrations
- express 

## Installation

```bash
$ npm install @flares/core
```

## Basic Usage

```ts
throw new Flare(404, 'Not Found')
throw new Flare(404, 'Not Found', { timestamp: Date.now() })
throw new Flare(404, 'Not Found', 'My custom message')
throw new Flare(500, 'Internal Server Error', new Error())
```