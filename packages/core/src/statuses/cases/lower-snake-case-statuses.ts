import { CodeStatuses as S } from '../code-statuses'

export const LowerSnakeCaseInfoStatuses = {
    'continue':                         S[100],
    'switching_protocols':              S[101],
    'processing':                       S[102],
    'early_hints':                      S[103],
} as const

export const LowerSnakeCaseSuccessStatuses = {
    'ok':                               S[200],
    'created':                          S[201],
    'accepted':                         S[202],
    'non_authoritative_information':    S[203],
    'no_content':                       S[204],
    'reset_content':                    S[205],
    'partial_content':                  S[206],
    'multi_status':                     S[207],
    'already_reported':                 S[208],
    'im_used':                          S[226],
    'used':                             S[226],
} as const

export const LowerSnakeCaseRedirectStatuses = {
    'multiple_choices':                 S[300],
    'moved_permanently':                S[301],
    'found':                            S[302],
    'see_other':                        S[303],
    'not_modified':                     S[304],
    'use_proxy':                        S[305],
    'switch_proxy':                     S[306],
    'temporary_redirect':               S[307],
    'permanent_redirect':               S[308],
} as const

export const LowerSnakeCaseClientStatuses = {
    'bad_request':                      S[400],
    'unauthorized':                     S[401],
    'payment_required':                 S[402],
    'forbidden':                        S[403],
    'not_found':                        S[404],
    'method_not_allowed':               S[405],
    'not_acceptable':                   S[406],
    'proxy_authentication_required':    S[407],
    'request_timeout':                  S[408],
    'conflict':                         S[409],
    'gone':                             S[410],
    'length_required':                  S[411],
    'precondition_failed':              S[412],
    'payload_too_large':                S[413],
    'uri_too_long':                     S[414],
    'unsupported_media_type':           S[415],
    'range_not_satisfiable':            S[416],
    'expectation_failed':               S[417],
    'im_a_teapot':                      S[418],
    'teapot':                           S[418],
    'misdirected_request':              S[421],
    'unprocessable_entity':             S[422],
    'locked':                           S[423],
    'failed_dependency':                S[424],
    'too_early':                        S[425],
    'upgrade_required':                 S[426],
    'precondition_required':            S[428],
    'too_many_requests':                S[429],
    'request_header_fields_too_large':  S[431],
    'unavailable_for_legal_reasons':    S[451],
} as const

export const LowerSnakeCaseServerStatuses = {
    'internal':                         S[500],
    'internal_server_error':            S[500],
    'not_implemented':                  S[501],
    'bad_gateway':                      S[502],
    'service_unavailable':              S[503],
    'gateway_timeout':                  S[504],
    'http_version_not_supported':       S[505],
    'variant_also_negotiates':          S[506],
    'insufficient_storage':             S[507],
    'loop_detected':                    S[508],
    'not_extended':                     S[510],
    'network_authentication_required':  S[511],
} as const

export const LowerSnakeCaseStatuses = {
    ...LowerSnakeCaseInfoStatuses,
    ...LowerSnakeCaseSuccessStatuses,
    ...LowerSnakeCaseRedirectStatuses,
    ...LowerSnakeCaseClientStatuses,
    ...LowerSnakeCaseServerStatuses,
} as const


export type LowerSnakeCaseInfoStatuses = typeof LowerSnakeCaseInfoStatuses
export type LowerSnakeCaseSuccessStatuses = typeof LowerSnakeCaseSuccessStatuses
export type LowerSnakeCaseRedirectStatuses = typeof LowerSnakeCaseRedirectStatuses
export type LowerSnakeCaseClientStatuses = typeof LowerSnakeCaseClientStatuses
export type LowerSnakeCaseServerStatuses = typeof LowerSnakeCaseServerStatuses
export type LowerSnakeCaseStatuses = typeof LowerSnakeCaseStatuses