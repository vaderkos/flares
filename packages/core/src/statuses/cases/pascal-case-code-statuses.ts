import { CodeStatuses as S } from '../code-statuses'

export type PascalCaseCodeStatuses = typeof PascalCaseCodeStatuses

export const PascalCaseCodeStatuses = {
    Continue100:                      S[100],
    SwitchingProtocols101:            S[101],
    Processing102:                    S[102],
    EarlyHints103:                    S[103],
    Ok200:                            S[200],
    Created201:                       S[201],
    Accepted202:                      S[202],
    NonAuthoritativeInformation203:   S[203],
    NoContent204:                     S[204],
    ResetContent205:                  S[205],
    PartialContent206:                S[206],
    MultiStatus207:                   S[207],
    AlreadyReported208:               S[208],
    ImUsed226:                        S[226],
    MultipleChoices300:               S[300],
    MovedPermanently301:              S[301],
    Found302:                         S[302],
    SeeOther303:                      S[303],
    NotModified304:                   S[304],
    UseProxy305:                      S[305],
    SwitchProxy306:                   S[306],
    TemporaryRedirect307:             S[307],
    PermanentRedirect308:             S[308],
    BadRequest400:                    S[400],
    Unauthorized401:                  S[401],
    PaymentRequired402:               S[402],
    Forbidden403:                     S[403],
    NotFound404:                      S[404],
    MethodNotAllowed405:              S[405],
    NotAcceptable406:                 S[406],
    ProxyAuthenticationRequired407:   S[407],
    RequestTimeout408:                S[408],
    Conflict409:                      S[409],
    Gone410:                          S[410],
    LengthRequired411:                S[411],
    PreconditionFailed412:            S[412],
    PayloadTooLarge413:               S[413],
    UriTooLong414:                    S[414],
    UnsupportedMediaType415:          S[415],
    RangeNotSatisfiable416:           S[416],
    ExpectationFailed417:             S[417],
    ImATeapot418:                     S[418],
    MisdirectedRequest421:            S[421],
    UnprocessableEntity422:           S[422],
    Locked423:                        S[423],
    FailedDependency424:              S[424],
    TooEarly425:                      S[425],
    UpgradeRequired426:               S[426],
    PreconditionRequired428:          S[428],
    TooManyRequests429:               S[429],
    RequestHeaderFieldsTooLarge431:   S[431],
    UnavailableForLegalReasons451:    S[451],
    InternalServerError500:           S[500],
    NotImplemented501:                S[501],
    BadGateway502:                    S[502],
    ServiceUnavailable503:            S[503],
    GatewayTimeout504:                S[504],
    HttpVersionNotSupported505:       S[505],
    VariantAlsoNegotiates506:         S[506],
    InsufficientStorage507:           S[507],
    LoopDetected508:                  S[508],
    NotExtended510:                   S[510],
    NetworkAuthenticationRequired511: S[511],

    Used226:                          S[226],
    Teapot418:                        S[418],
    Internal500:                      S[500],
} as const