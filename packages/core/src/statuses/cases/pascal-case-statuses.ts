import { CodeStatuses as S } from '../code-statuses'

export const PascalCaseInfoStatuses = {
    Continue:                      S[100],
    SwitchingProtocols:            S[101],
    Processing:                    S[102],
    EarlyHints:                    S[103],
} as const

export const PascalCaseSuccessStatuses = {
    Ok:                            S[200],
    Created:                       S[201],
    Accepted:                      S[202],
    NonAuthoritativeInformation:   S[203],
    NoContent:                     S[204],
    ResetContent:                  S[205],
    PartialContent:                S[206],
    MultiStatus:                   S[207],
    AlreadyReported:               S[208],
    ImUsed:                        S[226],
    Used:                          S[226],
} as const

export const PascalCaseRedirectStatuses = {
    MultipleChoices:               S[300],
    MovedPermanently:              S[301],
    Found:                         S[302],
    SeeOther:                      S[303],
    NotModified:                   S[304],
    UseProxy:                      S[305],
    SwitchProxy:                   S[306],
    TemporaryRedirect:             S[307],
    PermanentRedirect:             S[308],
} as const

export const PascalCaseClientStatuses = {
    BadRequest:                    S[400],
    Unauthorized:                  S[401],
    PaymentRequired:               S[402],
    Forbidden:                     S[403],
    NotFound:                      S[404],
    MethodNotAllowed:              S[405],
    NotAcceptable:                 S[406],
    ProxyAuthenticationRequired:   S[407],
    RequestTimeout:                S[408],
    Conflict:                      S[409],
    Gone:                          S[410],
    LengthRequired:                S[411],
    PreconditionFailed:            S[412],
    PayloadTooLarge:               S[413],
    UriTooLong:                    S[414],
    UnsupportedMediaType:          S[415],
    RangeNotSatisfiable:           S[416],
    ExpectationFailed:             S[417],
    ImATeapot:                     S[418],
    Teapot:                        S[418],
    MisdirectedRequest:            S[421],
    UnprocessableEntity:           S[422],
    Locked:                        S[423],
    FailedDependency:              S[424],
    TooEarly:                      S[425],
    UpgradeRequired:               S[426],
    PreconditionRequired:          S[428],
    TooManyRequests:               S[429],
    RequestHeaderFieldsTooLarge:   S[431],
    UnavailableForLegalReasons:    S[451],
} as const

export const PascalCaseServerStatuses = {
    Internal:                      S[500],
    InternalServerError:           S[500],
    NotImplemented:                S[501],
    BadGateway:                    S[502],
    ServiceUnavailable:            S[503],
    GatewayTimeout:                S[504],
    HttpVersionNotSupported:       S[505],
    VariantAlsoNegotiates:         S[506],
    InsufficientStorage:           S[507],
    LoopDetected:                  S[508],
    NotExtended:                   S[510],
    NetworkAuthenticationRequired: S[511],
} as const

export const PascalCaseStatuses = {
    ...PascalCaseInfoStatuses,
    ...PascalCaseSuccessStatuses,
    ...PascalCaseRedirectStatuses,
    ...PascalCaseClientStatuses,
    ...PascalCaseServerStatuses,
} as const

export type PascalCaseInfoStatuses = typeof PascalCaseInfoStatuses
export type PascalCaseSuccessStatuses = typeof PascalCaseSuccessStatuses
export type PascalCaseRedirectStatuses = typeof PascalCaseRedirectStatuses
export type PascalCaseClientStatuses = typeof PascalCaseClientStatuses
export type PascalCaseServerStatuses = typeof PascalCaseServerStatuses
export type PascalCaseStatuses = typeof PascalCaseStatuses