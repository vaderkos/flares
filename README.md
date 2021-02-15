# 🧨🔥 Flares  - Highly customizable Typescript status code library 


## Integrations
- [Express](https://github.com/vaderkos/flares/tree/develop/packages/express)

## Installation
Choose your favorite naming convention from:
* [Pascal case](https://www.npmjs.com/package/@flares/pascal-case-flares) 
```typescript 
throw new Fls.BadRequest('Error happened')
// or
return Fls.BadRequest('Error happened')
```
* [Pascal case with code](https://www.npmjs.com/package/@flares/pascal-case-code-flares) 
```typescript 
throw new Fls.BadRequest400('Error happened')
// or
return Fls.BadRequest400('Error happened')
```
* [Camel case](https://www.npmjs.com/package/@flares/camel-case-flares)
```typescript 
throw new Fls.badRequest('Error happened')
// or
return Fls.badRequest('Error happened')
```
* [Camel case with code](https://www.npmjs.com/package/@flares/camel-case-code-flares) 
```typescript 
throw new Fls.badRequest400('Error happened')
// or
return Fls.badRequest400('Error happened')
```


You can also write your own implementation using [`@flares/core` module](https://github.com/vaderkos/flares/tree/develop/packages/core)
