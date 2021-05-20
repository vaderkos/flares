import { CodeStatuses as S } from '../code-statuses'

export const LowerDotCaseInfoStatuses = {
    'continue':                         S[100],
    'switching.protocols':              S[101],
    'processing':                       S[102],
    'early.hints':                      S[103],
} as const

export const LowerDotCaseSuccessStatuses = {
    'ok':                               S[200],
    'created':                          S[201],
    'accepted':                         S[202],
    'non.authoritative.information':    S[203],
    'no.content':                       S[204],
    'reset.content':                    S[205],
    'partial.content':                  S[206],
    'multi.status':                     S[207],
    'already.reported':                 S[208],
    'im.used':                          S[226],
    'used':                             S[226],
} as const

export const LowerDotCaseRedirectStatuses = {
    'multiple.choices':                 S[300],
    'moved.permanently':                S[301],
    'found':                            S[302],
    'see.other':                        S[303],
    'not.modified':                     S[304],
    'use.proxy':                        S[305],
    'switch.proxy':                     S[306],
    'temporary.redirect':               S[307],
    'permanent.redirect':               S[308],
} as const

export const LowerDotCaseClientStatuses = {
    'bad.request':                      S[400],
    'unauthorized':                     S[401],
    'payment.required':                 S[402],
    'forbidden':                        S[403],
    'not.found':                        S[404],
    'method.not.allowed':               S[405],
    'not.acceptable':                   S[406],
    'proxy.authentication.required':    S[407],
    'request.timeout':                  S[408],
    'conflict':                         S[409],
    'gone':                             S[410],
    'length.required':                  S[411],
    'precondition.failed':              S[412],
    'payload.too.large':                S[413],
    'uri.too.long':                     S[414],
    'unsupported.media.type':           S[415],
    'range.not.satisfiable':            S[416],
    'expectation.failed':               S[417],
    'im.a.teapot':                      S[418],
    'teapot':                           S[418],
    'misdirected.request':              S[421],
    'unprocessable.entity':             S[422],
    'locked':                           S[423],
    'failed.dependency':                S[424],
    'too.early':                        S[425],
    'upgrade.required':                 S[426],
    'precondition.required':            S[428],
    'too.many.requests':                S[429],
    'request.header.fields.too.large':  S[431],
    'unavailable.for.legal.reasons':    S[451],
} as const

export const LowerDotCaseServerStatuses = {
    'internal':                         S[500],
    'internal.server.error':            S[500],
    'not.implemented':                  S[501],
    'bad.gateway':                      S[502],
    'service.unavailable':              S[503],
    'gateway.timeout':                  S[504],
    'http.version.not.supported':       S[505],
    'variant.also.negotiates':          S[506],
    'insufficient.storage':             S[507],
    'loop.detected':                    S[508],
    'not.extended':                     S[510],
    'network.authentication.required':  S[511],
} as const

export const LowerDotCaseStatuses = {
    ...LowerDotCaseInfoStatuses,
    ...LowerDotCaseSuccessStatuses,
    ...LowerDotCaseRedirectStatuses,
    ...LowerDotCaseClientStatuses,
    ...LowerDotCaseServerStatuses,
} as const


export type LowerDotCaseInfoStatuses = typeof LowerDotCaseInfoStatuses
export type LowerDotCaseSuccessStatuses = typeof LowerDotCaseSuccessStatuses
export type LowerDotCaseRedirectStatuses = typeof LowerDotCaseRedirectStatuses
export type LowerDotCaseClientStatuses = typeof LowerDotCaseClientStatuses
export type LowerDotCaseServerStatuses = typeof LowerDotCaseServerStatuses
export type LowerDotCaseStatuses = typeof LowerDotCaseStatuses