import { Flares, CamelCaseStatuses } from '@flares/core'

export const CamelCaseFlares = new Flares(CamelCaseStatuses)

export type CamelCaseFlares = typeof CamelCaseFlares

export const Fls = CamelCaseFlares

/* JS has some words like 'continue' reserved so no export of properties */

