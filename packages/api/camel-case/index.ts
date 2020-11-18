
import { CamelCaseStatuses, FlaresConstructor } from '@flares/core'

export { CamelCaseStatuses }

export const CamelCaseFlares = new FlaresConstructor(CamelCaseStatuses)

export const Flares = CamelCaseFlares
export const F = Flares