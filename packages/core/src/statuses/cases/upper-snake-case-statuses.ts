import { CodeStatuses as S } from '../code-statuses'

export const UpperSnakeCaseInfoStatuses = {
    CONTINUE:                        S[100],
    SWITCHING_PROTOCOLS:             S[101],
    PROCESSING:                      S[102],
    EARLY_HINTS:                     S[103],
} as const

export const UpperSnakeCaseSuccessStatuses = {
    OK:                              S[200],
    CREATED:                         S[201],
    ACCEPTED:                        S[202],
    NON_AUTHORITATIVE_INFORMATION:   S[203],
    NO_CONTENT:                      S[204],
    RESET_CONTENT:                   S[205],
    PARTIAL_CONTENT:                 S[206],
    MULTI_STATUS:                    S[207],
    ALREADY_REPORTED:                S[208],
    IM_USED:                         S[226],
    USED:                            S[226],
} as const

export const UpperSnakeCaseRedirectStatuses = {
    MULTIPLE_CHOICES:                S[300],
    MOVED_PERMANENTLY:               S[301],
    FOUND:                           S[302],
    SEE_OTHER:                       S[303],
    NOT_MODIFIED:                    S[304],
    USE_PROXY:                       S[305],
    SWITCH_PROXY:                    S[306],
    TEMPORARY_REDIRECT:              S[307],
    PERMANENT_REDIRECT:              S[308],
} as const

export const UpperSnakeCaseClientStatuses = {
    BAD_REQUEST:                     S[400],
    UNAUTHORIZED:                    S[401],
    PAYMENT_REQUIRED:                S[402],
    FORBIDDEN:                       S[403],
    NOT_FOUND:                       S[404],
    METHOD_NOT_ALLOWED:              S[405],
    NOT_ACCEPTABLE:                  S[406],
    PROXY_AUTHENTICATION_REQUIRED:   S[407],
    REQUEST_TIMEOUT:                 S[408],
    CONFLICT:                        S[409],
    GONE:                            S[410],
    LENGTH_REQUIRED:                 S[411],
    PRECONDITION_FAILED:             S[412],
    PAYLOAD_TOO_LARGE:               S[413],
    URI_TOO_LONG:                    S[414],
    UNSUPPORTED_MEDIA_TYPE:          S[415],
    RANGE_NOT_SATISFIABLE:           S[416],
    EXPECTATION_FAILED:              S[417],
    IM_A_TEAPOT:                     S[418],
    TEAPOT:                          S[418],
    MISDIRECTED_REQUEST:             S[421],
    UNPROCESSABLE_ENTITY:            S[422],
    LOCKED:                          S[423],
    FAILED_DEPENDENCY:               S[424],
    TOO_EARLY:                       S[425],
    UPGRADE_REQUIRED:                S[426],
    PRECONDITION_REQUIRED:           S[428],
    TOO_MANY_REQUESTS:               S[429],
    REQUEST_HEADER_FIELDS_TOO_LARGE: S[431],
    UNAVAILABLE_FOR_LEGAL_REASONS:   S[451],
} as const

export const UpperSnakeCaseServerStatuses = {
    INTERNAL:                        S[500],
    INTERNAL_SERVER_ERROR:           S[500],
    NOT_IMPLEMENTED:                 S[501],
    BAD_GATEWAY:                     S[502],
    SERVICE_UNAVAILABLE:             S[503],
    GATEWAY_TIMEOUT:                 S[504],
    HTTP_VERSION_NOT_SUPPORTED:      S[505],
    VARIANT_ALSO_NEGOTIATES:         S[506],
    INSUFFICIENT_STORAGE:            S[507],
    LOOP_DETECTED:                   S[508],
    NOT_EXTENDED:                    S[510],
    NETWORK_AUTHENTICATION_REQUIRED: S[511],
} as const

export const UpperSnakeCaseStatuses = {
    ...UpperSnakeCaseInfoStatuses,
    ...UpperSnakeCaseSuccessStatuses,
    ...UpperSnakeCaseRedirectStatuses,
    ...UpperSnakeCaseClientStatuses,
    ...UpperSnakeCaseServerStatuses,
} as const

export type UpperSnakeCaseInfoStatuses = typeof UpperSnakeCaseInfoStatuses
export type UpperSnakeCaseSuccessStatuses = typeof UpperSnakeCaseSuccessStatuses
export type UpperSnakeCaseRedirectStatuses = typeof UpperSnakeCaseRedirectStatuses
export type UpperSnakeCaseClientStatuses = typeof UpperSnakeCaseClientStatuses
export type UpperSnakeCaseServerStatuses = typeof UpperSnakeCaseServerStatuses
export type UpperSnakeCaseStatuses = typeof UpperSnakeCaseStatuses