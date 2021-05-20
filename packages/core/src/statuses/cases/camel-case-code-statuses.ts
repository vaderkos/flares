import { CodeStatuses as S } from '../code-statuses'

export const CamelCaseCodeInfoStatuses = {
    continue100:                       S[100],
    switchingProtocols101:             S[101],
    processing102:                     S[102],
    earlyHints103:                     S[103],
} as const

export const CamelCaseCodeSuccessStatuses = {
    ok200:                             S[200],
    created201:                        S[201],
    accepted202:                       S[202],
    nonAuthoritativeInformation203:    S[203],
    noContent204:                      S[204],
    resetContent205:                   S[205],
    partialContent206:                 S[206],
    multiStatus207:                    S[207],
    alreadyReported208:                S[208],
    imUsed226:                         S[226],
    used226:                           S[226],
} as const

export const CamelCaseCodeRedirectStatuses = {
    multipleChoices300:                S[300],
    movedPermanently301:               S[301],
    found302:                          S[302],
    seeOther303:                       S[303],
    notModified304:                    S[304],
    useProxy305:                       S[305],
    switchProxy306:                    S[306],
    temporaryRedirect307:              S[307],
    permanentRedirect308:              S[308],
} as const

export const CamelCaseCodeClientStatuses = {
    badRequest400:                     S[400],
    unauthorized401:                   S[401],
    paymentRequired402:                S[402],
    forbidden403:                      S[403],
    notFound404:                       S[404],
    methodNotAllowed405:               S[405],
    notAcceptable406:                  S[406],
    proxyAuthenticationRequired407:    S[407],
    requestTimeout408:                 S[408],
    conflict409:                       S[409],
    gone410:                           S[410],
    lengthRequired411:                 S[411],
    preconditionFailed412:             S[412],
    payloadTooLarge413:                S[413],
    uriTooLong414:                     S[414],
    unsupportedMediaType415:           S[415],
    rangeNotSatisfiable416:            S[416],
    expectationFailed417:              S[417],
    imATeapot418:                      S[418],
    teapot418:                         S[418],
    misdirectedRequest421:             S[421],
    unprocessableEntity422:            S[422],
    locked423:                         S[423],
    failedDependency424:               S[424],
    tooEarly425:                       S[425],
    upgradeRequired426:                S[426],
    preconditionRequired428:           S[428],
    tooManyRequests429:                S[429],
    requestHeaderFieldsTooLarge431:    S[431],
    unavailableForLegalReasons451:     S[451],
} as const

export const CamelCaseCodeServerStatuses = {
    internal500:                       S[500],
    internalServerError500:            S[500],
    notImplemented501:                 S[501],
    badGateway502:                     S[502],
    serviceUnavailable503:             S[503],
    gatewayTimeout504:                 S[504],
    httpVersionNotSupported505:        S[505],
    variantAlsoNegotiates506:          S[506],
    insufficientStorage507:            S[507],
    loopDetected508:                   S[508],
    notExtended510:                    S[510],
    networkAuthenticationRequired511:  S[511],
} as const

export const CamelCaseCodeStatuses = {
    ...CamelCaseCodeInfoStatuses,
    ...CamelCaseCodeSuccessStatuses,
    ...CamelCaseCodeRedirectStatuses,
    ...CamelCaseCodeClientStatuses,
    ...CamelCaseCodeServerStatuses,
} as const

export type CamelCaseCodeInfoStatuses = typeof CamelCaseCodeInfoStatuses
export type CamelCaseCodeSuccessStatuses = typeof CamelCaseCodeSuccessStatuses
export type CamelCaseCodeRedirectStatuses = typeof CamelCaseCodeRedirectStatuses
export type CamelCaseCodeClientStatuses = typeof CamelCaseCodeClientStatuses
export type CamelCaseCodeServerStatuses = typeof CamelCaseCodeServerStatuses
export type CamelCaseCodeStatuses = typeof CamelCaseCodeStatuses