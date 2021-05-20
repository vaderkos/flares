import { CodeStatuses as S } from '../code-statuses'

export const UpperDashCaseInfoStatuses = {
    'CONTINUE':                        S[100],
    'SWITCHING-PROTOCOLS':             S[101],
    'PROCESSING':                      S[102],
    'EARLY-HINTS':                     S[103],
} as const

export const UpperDashCaseSuccessStatuses = {
    'OK':                              S[200],
    'CREATED':                         S[201],
    'ACCEPTED':                        S[202],
    'NON-AUTHORITATIVE-INFORMATION':   S[203],
    'NO-CONTENT':                      S[204],
    'RESET-CONTENT':                   S[205],
    'PARTIAL-CONTENT':                 S[206],
    'MULTI-STATUS':                    S[207],
    'ALREADY-REPORTED':                S[208],
    'IM-USED':                         S[226],
    'USED':                            S[226],
} as const

export const UpperDashCaseRedirectStatuses = {
    'MULTIPLE-CHOICES':                S[300],
    'MOVED-PERMANENTLY':               S[301],
    'FOUND':                           S[302],
    'SEE-OTHER':                       S[303],
    'NOT-MODIFIED':                    S[304],
    'USE-PROXY':                       S[305],
    'SWITCH-PROXY':                    S[306],
    'TEMPORARY-REDIRECT':              S[307],
    'PERMANENT-REDIRECT':              S[308],
} as const

export const UpperDashCaseClientStatuses = {
    'BAD-REQUEST':                     S[400],
    'UNAUTHORIZED':                    S[401],
    'PAYMENT-REQUIRED':                S[402],
    'FORBIDDEN':                       S[403],
    'NOT-FOUND':                       S[404],
    'METHOD-NOT-ALLOWED':              S[405],
    'NOT-ACCEPTABLE':                  S[406],
    'PROXY-AUTHENTICATION-REQUIRED':   S[407],
    'REQUEST-TIMEOUT':                 S[408],
    'CONFLICT':                        S[409],
    'GONE':                            S[410],
    'LENGTH-REQUIRED':                 S[411],
    'PRECONDITION-FAILED':             S[412],
    'PAYLOAD-TOO-LARGE':               S[413],
    'URI-TOO-LONG':                    S[414],
    'UNSUPPORTED-MEDIA-TYPE':          S[415],
    'RANGE-NOT-SATISFIABLE':           S[416],
    'EXPECTATION-FAILED':              S[417],
    'IM-A-TEAPOT':                     S[418],
    'TEAPOT':                          S[418],
    'MISDIRECTED-REQUEST':             S[421],
    'UNPROCESSABLE-ENTITY':            S[422],
    'LOCKED':                          S[423],
    'FAILED-DEPENDENCY':               S[424],
    'TOO-EARLY':                       S[425],
    'UPGRADE-REQUIRED':                S[426],
    'PRECONDITION-REQUIRED':           S[428],
    'TOO-MANY-REQUESTS':               S[429],
    'REQUEST-HEADER-FIELDS-TOO-LARGE': S[431],
    'UNAVAILABLE-FOR-LEGAL-REASONS':   S[451],
} as const

export const UpperDashCaseServerStatuses = {
    'INTERNAL':                        S[500],
    'INTERNAL-SERVER-ERROR':           S[500],
    'NOT-IMPLEMENTED':                 S[501],
    'BAD-GATEWAY':                     S[502],
    'SERVICE-UNAVAILABLE':             S[503],
    'GATEWAY-TIMEOUT':                 S[504],
    'HTTP-VERSION-NOT-SUPPORTED':      S[505],
    'VARIANT-ALSO-NEGOTIATES':         S[506],
    'INSUFFICIENT-STORAGE':            S[507],
    'LOOP-DETECTED':                   S[508],
    'NOT-EXTENDED':                    S[510],
    'NETWORK-AUTHENTICATION-REQUIRED': S[511],
} as const

export const UpperDashCaseStatuses = {
    ...UpperDashCaseInfoStatuses,
    ...UpperDashCaseSuccessStatuses,
    ...UpperDashCaseRedirectStatuses,
    ...UpperDashCaseClientStatuses,
    ...UpperDashCaseServerStatuses,
} as const

export type UpperDashCaseInfoStatuses = typeof UpperDashCaseInfoStatuses
export type UpperDashCaseSuccessStatuses = typeof UpperDashCaseSuccessStatuses
export type UpperDashCaseRedirectStatuses = typeof UpperDashCaseRedirectStatuses
export type UpperDashCaseClientStatuses = typeof UpperDashCaseClientStatuses
export type UpperDashCaseServerStatuses = typeof UpperDashCaseServerStatuses
export type UpperDashCaseStatuses = typeof UpperDashCaseStatuses