
export const assertArgType = (
    arg: any,
    argName: string,
    argType: string
): void => {
    // eslint-disable-next-line valid-typeof
    if (typeof arg !== argType) {
        throw new TypeError(`Argument of invalid type (${typeof arg}) specified for ${argName}, expected ${argType}`)
    }
}

/**
 * Creates function that checks whether specified object's property would be within
 * @param startInclusive
 * @param endExclusive
 */
export const isStatusCodePropInRange = (startInclusive: number, endExclusive: number) =>
    <T extends { statusCode: number }>({ statusCode }: T): boolean => {
        assertArgType(statusCode, 'statusCode', 'number')

        return statusCode >= startInclusive && statusCode < endExclusive
    }

export const defineStaticMethods = (obj: object, methods: Record<string, (...args: any[]) => any>): void => {
    const descriptors = Object.fromEntries(
        Object
            .entries(methods)
            .map(([name, impl]) => [name, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: impl
            }])
    )

    Object.defineProperties(obj, descriptors)
}
