import { Flares, CamelCaseCodeStatuses } from '@flares/core'

export const CamelCaseCodeFlares = new Flares(CamelCaseCodeStatuses)

export type CamelCaseCodeFlares = typeof CamelCaseCodeFlares

export const Fls = CamelCaseCodeFlares

export const {
    continue100,
    switchingProtocols101,
    processing102,
    earlyHints103,
    ok200,
    created201,
    accepted202,
    nonAuthoritativeInformation203,
    noContent204,
    resetContent205,
    partialContent206,
    multiStatus207,
    alreadyReported208,
    imUsed226,
    multipleChoices300,
    movedPermanently301,
    found302,
    seeOther303,
    notModified304,
    useProxy305,
    switchProxy306,
    temporaryRedirect307,
    permanentRedirect308,
    badRequest400,
    unauthorized401,
    paymentRequired402,
    forbidden403,
    notFound404,
    methodNotAllowed405,
    notAcceptable406,
    proxyAuthenticationRequired407,
    requestTimeout408,
    conflict409,
    gone410,
    lengthRequired411,
    preconditionFailed412,
    payloadTooLarge413,
    uriTooLong414,
    unsupportedMediaType415,
    rangeNotSatisfiable416,
    expectationFailed417,
    imATeapot418,
    misdirectedRequest421,
    unprocessableEntity422,
    locked423,
    failedDependency424,
    tooEarly425,
    upgradeRequired426,
    preconditionRequired428,
    tooManyRequests429,
    requestHeaderFieldsTooLarge431,
    unavailableForLegalReasons451,
    internalServerError500,
    notImplemented501,
    badGateway502,
    serviceUnavailable503,
    gatewayTimeout504,
    httpVersionNotSupported505,
    variantAlsoNegotiates506,
    insufficientStorage507,
    loopDetected508,
    notExtended510,
    networkAuthenticationRequired511,
    used226,
    teapot418,
    internal500,
} = CamelCaseCodeFlares