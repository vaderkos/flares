import { CodeStatuses as S } from '../code-statuses'

export const CamelCaseInfoStatuses = {
    continue:                       S[100],
    switchingProtocols:             S[101],
    processing:                     S[102],
    earlyHints:                     S[103],
} as const

export const CamelCaseSuccessStatuses = {
    ok:                             S[200],
    created:                        S[201],
    accepted:                       S[202],
    nonAuthoritativeInformation:    S[203],
    noContent:                      S[204],
    resetContent:                   S[205],
    partialContent:                 S[206],
    multiStatus:                    S[207],
    alreadyReported:                S[208],
    imUsed:                         S[226],
    used:                           S[226],
} as const

export const CamelCaseRedirectStatuses = {
    multipleChoices:                S[300],
    movedPermanently:               S[301],
    found:                          S[302],
    seeOther:                       S[303],
    notModified:                    S[304],
    useProxy:                       S[305],
    switchProxy:                    S[306],
    temporaryRedirect:              S[307],
    permanentRedirect:              S[308],
} as const

export const CamelCaseClientStatuses = {
    badRequest:                     S[400],
    unauthorized:                   S[401],
    paymentRequired:                S[402],
    forbidden:                      S[403],
    notFound:                       S[404],
    methodNotAllowed:               S[405],
    notAcceptable:                  S[406],
    proxyAuthenticationRequired:    S[407],
    requestTimeout:                 S[408],
    conflict:                       S[409],
    gone:                           S[410],
    lengthRequired:                 S[411],
    preconditionFailed:             S[412],
    payloadTooLarge:                S[413],
    uriTooLong:                     S[414],
    unsupportedMediaType:           S[415],
    rangeNotSatisfiable:            S[416],
    expectationFailed:              S[417],
    imATeapot:                      S[418],
    teapot:                         S[418],
    misdirectedRequest:             S[421],
    unprocessableEntity:            S[422],
    locked:                         S[423],
    failedDependency:               S[424],
    tooEarly:                       S[425],
    upgradeRequired:                S[426],
    preconditionRequired:           S[428],
    tooManyRequests:                S[429],
    requestHeaderFieldsTooLarge:    S[431],
    unavailableForLegalReasons:     S[451],
} as const

export const CamelCaseServerStatuses = {
    internal:                       S[500],
    internalServerError:            S[500],
    notImplemented:                 S[501],
    badGateway:                     S[502],
    serviceUnavailable:             S[503],
    gatewayTimeout:                 S[504],
    httpVersionNotSupported:        S[505],
    variantAlsoNegotiates:          S[506],
    insufficientStorage:            S[507],
    loopDetected:                   S[508],
    notExtended:                    S[510],
    networkAuthenticationRequired:  S[511],
} as const

export const CamelCaseStatuses = {
    ...CamelCaseInfoStatuses,
    ...CamelCaseSuccessStatuses,
    ...CamelCaseRedirectStatuses,
    ...CamelCaseClientStatuses,
    ...CamelCaseServerStatuses,
} as const


export type CamelCaseInfoStatuses = typeof CamelCaseInfoStatuses
export type CamelCaseSuccessStatuses = typeof CamelCaseSuccessStatuses
export type CamelCaseRedirectStatuses = typeof CamelCaseRedirectStatuses
export type CamelCaseClientStatuses = typeof CamelCaseClientStatuses
export type CamelCaseServerStatuses = typeof CamelCaseServerStatuses
export type CamelCaseStatuses = typeof CamelCaseStatuses

