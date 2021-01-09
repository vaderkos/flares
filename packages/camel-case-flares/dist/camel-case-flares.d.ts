import { Flares } from '@flares/core';
declare const CamelCaseFlares: Flares<{
    readonly continue: readonly [100, "Continue"];
    readonly switchingProtocols: readonly [101, "Switching Protocols"];
    readonly processing: readonly [102, "Processing"];
    readonly earlyHints: readonly [103, "Early Hints"];
    readonly ok: readonly [200, "OK"];
    readonly created: readonly [201, "Created"];
    readonly accepted: readonly [202, "Accepted"];
    readonly nonAuthoritativeInformation: readonly [203, "Non-Authoritative Information"];
    readonly noContent: readonly [204, "No Content"];
    readonly resetContent: readonly [205, "Reset Content"];
    readonly partialContent: readonly [206, "Partial Content"];
    readonly multiStatus: readonly [207, "Multi-Status"];
    readonly alreadyReported: readonly [208, "Already Reported"];
    readonly imUsed: readonly [226, "IM Used"];
    readonly multipleChoices: readonly [300, "Multiple Choices"];
    readonly movedPermanently: readonly [301, "Moved Permanently"];
    readonly found: readonly [302, "Found"];
    readonly seeOther: readonly [303, "See Other"];
    readonly notModified: readonly [304, "Not Modified"];
    readonly useProxy: readonly [305, "Use Proxy"];
    readonly switchProxy: readonly [306, "Switch Proxy"];
    readonly temporaryRedirect: readonly [307, "Temporary Redirect"];
    readonly permanentRedirect: readonly [308, "Permanent Redirect"];
    readonly badRequest: readonly [400, "Bad Request"];
    readonly unauthorized: readonly [401, "Unauthorized"];
    readonly paymentRequired: readonly [402, "Payment Required"];
    readonly forbidden: readonly [403, "Forbidden"];
    readonly notFound: readonly [404, "Not Found"];
    readonly methodNotAllowed: readonly [405, "Method Not Allowed"];
    readonly notAcceptable: readonly [406, "Not Acceptable"];
    readonly proxyAuthenticationRequired: readonly [407, "Proxy Authentication Required"];
    readonly requestTimeout: readonly [408, "Request Timeout"];
    readonly conflict: readonly [409, "Conflict"];
    readonly gone: readonly [410, "Gone"];
    readonly lengthRequired: readonly [411, "Length Required"];
    readonly preconditionFailed: readonly [412, "Precondition Failed"];
    readonly payloadTooLarge: readonly [413, "Payload Too Large"];
    readonly uriTooLong: readonly [414, "URI Too Long"];
    readonly unsupportedMediaType: readonly [415, "Unsupported Media Type"];
    readonly rangeNotSatisfiable: readonly [416, "Range Not Satisfiable"];
    readonly expectationFailed: readonly [417, "Expectation Failed"];
    readonly imATeapot: readonly [418, "I'm a teapot"];
    readonly misdirectedRequest: readonly [421, "Misdirected Request"];
    readonly unprocessableEntity: readonly [422, "Unprocessable Entity"];
    readonly locked: readonly [423, "Locked"];
    readonly failedDependency: readonly [424, "Failed Dependency"];
    readonly tooEarly: readonly [425, "Too Early"];
    readonly upgradeRequired: readonly [426, "Upgrade Required"];
    readonly preconditionRequired: readonly [428, "Precondition Required"];
    readonly tooManyRequests: readonly [429, "Too Many Requests"];
    readonly requestHeaderFieldsTooLarge: readonly [431, "Request Header Fields Too Large"];
    readonly unavailableForLegalReasons: readonly [451, "Unavailable For Legal Reasons"];
    readonly internalServerError: readonly [500, "Internal Server Error"];
    readonly notImplemented: readonly [501, "Not Implemented"];
    readonly badGateway: readonly [502, "Bad Gateway"];
    readonly serviceUnavailable: readonly [503, "Service Unavailable"];
    readonly gatewayTimeout: readonly [504, "Gateway Timeout"];
    readonly httpVersionNotSupported: readonly [505, "HTTP Version Not Supported"];
    readonly variantAlsoNegotiates: readonly [506, "Variant Also Negotiates"];
    readonly insufficientStorage: readonly [507, "Insufficient Storage"];
    readonly loopDetected: readonly [508, "Loop Detected"];
    readonly notExtended: readonly [510, "Not Extended"];
    readonly networkAuthenticationRequired: readonly [511, "Network Authentication Required"];
    readonly used: readonly [226, "IM Used"];
    readonly teapot: readonly [418, "I'm a teapot"];
    readonly internal: readonly [500, "Internal Server Error"];
}>;
declare type CamelCaseFlares = typeof CamelCaseFlares;
export { CamelCaseFlares, CamelCaseFlares as Fls };
