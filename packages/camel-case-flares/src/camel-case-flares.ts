import { Flares, CamelCaseStatuses } from '@flares/core'

const CamelCaseFlares = new Flares(CamelCaseStatuses)

type CamelCaseFlares = typeof CamelCaseFlares

export {
    CamelCaseFlares,
    CamelCaseFlares as Fls
}

