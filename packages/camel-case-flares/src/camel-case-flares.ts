import { Flares, CamelCaseStatuses } from '@flares/core'

const CamelCaseFlares = new Flares(CamelCaseStatuses)

type CamelCaseFlares = typeof CamelCaseFlares

export {
    CamelCaseFlares,
    CamelCaseFlares as Fls
}

/* JS has some words like 'continue' reserved so no export of properties */

