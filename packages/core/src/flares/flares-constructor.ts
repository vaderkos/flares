import { Statuses } from '../statuses'
import { Flares } from './flares'

export interface FlaresConstructor {
    // isFlares: typeof isFlares
    // isInfoFlares: typeof isInfoFlares
    // isSuccessFlares: typeof isSuccessFlares
    // isRedirectFlares: typeof isRedirectFlares
    // isClientFlares: typeof isClientFlares
    // isServerFlares: typeof isServerFlares

    guard <T extends AnyFlares = AnyFlares> (flares: AnyFlares): T

    <S extends Statuses> (statuses: S): Flares<S>
    new <S extends Statuses> (statuses: S): Flares<S>
}