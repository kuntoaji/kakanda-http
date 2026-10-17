// HTTP status codes from the IANA HTTP Status Code Registry,
// each with a link to the RFC section that defines it.
const HTTP_STATUSES = [{
  code: "100",
  phrase: "Continue",
  summary: "The server has received the request headers, and that the client should proceed to send the request body",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.2.1"
}, {
  code: "101",
  phrase: "Switching Protocols",
  summary: "The requester has asked the server to switch protocols and the server is acknowledging that it will do so",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.2.2"
}, {
  code: "102",
  phrase: "Processing",
  summary: "The server has received the request and is still processing it, so no response is available yet (WebDAV)",
  reference: "https://tools.ietf.org/html/rfc2518#section-10.1"
}, {
  code: "103",
  phrase: "Early Hints",
  summary: "The server sends preliminary headers, usually Link headers, so the client can start preloading resources before the final response",
  reference: "https://tools.ietf.org/html/rfc8297#section-2"
}, {
  code: "200",
  phrase: "OK",
  summary: "Standard response for successful HTTP requests",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.3.1"
}, {
  code: "201",
  phrase: "Created",
  summary: "The request has been fulfilled and resulted in a new resource being created",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.3.2"
}, {
  code: "202",
  phrase: "Accepted",
  summary: "The request has been accepted for processing, but the processing has not been completed",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.3.3"
}, {
  code: "203",
  phrase: "Non-Authoritative Information",
  summary: "The server successfully processed the request, but is returning information that may be from another source",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.3.4"
}, {
  code: "204",
  phrase: "No Content",
  summary: "The server successfully processed the request, but is not returning any content",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.3.5"
}, {
  code: "205",
  phrase: "Reset Content",
  summary: "The server successfully processed the request, but is not returning any content. Unlike a 204 response, this response requires that the requester reset the document view",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.3.6"
}, {
  code: "206",
  phrase: "Partial Content",
  summary: "The server is delivering only part of the resource (byte serving) due to a range header sent by the client",
  reference: "https://tools.ietf.org/html/rfc7233#section-4.1"
}, {
  code: "207",
  phrase: "Multi-Status",
  summary: "The response body holds separate status codes for multiple independent operations (WebDAV)",
  reference: "https://tools.ietf.org/html/rfc4918#section-11.1"
}, {
  code: "208",
  phrase: "Already Reported",
  summary: "The members of a binding were already listed in an earlier part of this multistatus response, so they are not repeated (WebDAV)",
  reference: "https://tools.ietf.org/html/rfc5842#section-7.1"
}, {
  code: "226",
  phrase: "IM Used",
  summary: "The server fulfilled a GET request, and the response is the result of instance manipulations applied to the current instance",
  reference: "https://tools.ietf.org/html/rfc3229#section-10.4.1"
}, {
  code: "300",
  phrase: "Multiple Choices",
  summary: "Indicates multiple options for the resource that the client may follow",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.4.1"
}, {
  code: "301",
  phrase: "Moved Permanently",
  summary: "This and all future requests should be directed to the given URI",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.4.2"
}, {
  code: "302",
  phrase: "Found",
  summary: "The target resource resides temporarily under a different URI",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.4.3"
}, {
  code: "303",
  phrase: "See Other",
  summary: "The server is redirecting to a different URI which accesses the same resource",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.4.4"
}, {
  code: "304",
  phrase: "Not Modified",
  summary: "There is no need to retransmit the resource, since the client still has a previously-downloaded copy",
  reference: "https://tools.ietf.org/html/rfc7232#section-4.1"
}, {
  code: "305",
  phrase: "Use Proxy",
  summary: "The requested resource is only available through a proxy, whose address is provided in the response",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.4.5"
}, {
  code: "307",
  phrase: "Temporary Redirect",
  summary: "The target resource resides temporarily under a different URI, and the client must not change the request method when it follows the redirect",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.4.7"
}, {
  code: "308",
  phrase: "Permanent Redirect",
  summary: "The target resource has a new permanent URI, and the client must not change the request method when it follows the redirect",
  reference: "https://tools.ietf.org/html/rfc9110#section-15.4.9"
}, {
  code: "400",
  phrase: "Bad Request",
  summary: "The request could not be understood by the server due to malformed syntax",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.5.1"
}, {
  code: "401",
  phrase: "Unauthorized",
  summary: "Authentication is required and has failed or has not yet been provided",
  reference: "https://tools.ietf.org/html/rfc7235#section-3.1"
}, {
  code: "402",
  phrase: "Payment Required",
  summary: "The 402 (Payment Required) status code is reserved for future use",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.5.2"
}, {
  code: "403",
  phrase: "Forbidden",
  summary: "The server understood the request but refuses to authorize it",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.5.3"
}, {
  code: "404",
  phrase: "Not Found",
  summary: "The requested resource could not be found but may be available again in the future",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.5.4"
}, {
  code: "405",
  phrase: "Method Not Allowed",
  summary: "A request was made of a resource using a request method not supported by that resource",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.5.5"
}, {
  code: "406",
  phrase: "Not Acceptable",
  summary: "The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.5.6"
}, {
  code: "407",
  phrase: "Proxy Authentication Required",
  summary: "The client must first authenticate itself with the proxy",
  reference: "https://tools.ietf.org/html/rfc7235#section-3.2"
}, {
  code: "408",
  phrase: "Request Timeout",
  summary: "The server timed out waiting for the request",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.5.7"
}, {
  code: "409",
  phrase: "Conflict",
  summary: "The request could not be processed because of conflict in the request",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.5.8"
}, {
  code: "410",
  phrase: "Gone",
  summary: "The resource requested is no longer available and will not be available again",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.5.9"
}, {
  code: "411",
  phrase: "Length Required",
  summary: "The request did not specify the length of its content, which is required by the requested resource",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.5.10"
}, {
  code: "412",
  phrase: "Precondition Failed",
  summary: "The server does not meet one of the preconditions that the requester put on the request",
  reference: "https://tools.ietf.org/html/rfc7232#section-4.2"
}, {
  code: "413",
  phrase: "Payload Too Large",
  summary: "The request is larger than the server is willing or able to process",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.5.11"
}, {
  code: "414",
  phrase: "URI Too Long",
  summary: "The URI provided was too long for the server to process",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.5.12"
}, {
  code: "415",
  phrase: "Unsupported Media Type",
  summary: "The request entity has a media type which the server or resource does not support",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.5.13"
}, {
  code: "416",
  phrase: "Range Not Satisfiable",
  summary: "The client has asked for a portion of the file (byte serving), but the server cannot supply that portion",
  reference: "https://tools.ietf.org/html/rfc7233#section-4.4"
}, {
  code: "417",
  phrase: "Expectation Failed",
  summary: "The server cannot meet the requirements of the Expect request-header field",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.5.14"
}, {
  code: "418",
  phrase: "I'm a teapot",
  summary: "Reserved. Originally an April Fools joke in RFC 2324 (HTCPCP), and some servers still return it for requests they refuse to handle",
  reference: "https://tools.ietf.org/html/rfc9110#section-15.5.19"
}, {
  code: "421",
  phrase: "Misdirected Request",
  summary: "The request was sent to a server that cannot produce a response for this combination of scheme and authority",
  reference: "https://tools.ietf.org/html/rfc9110#section-15.5.20"
}, {
  code: "422",
  phrase: "Unprocessable Entity",
  summary: "the server understands the content type of the request entity and the syntax of the request entity is correct but was unable to process the contained instructions.",
  reference: "https://tools.ietf.org/html/rfc4918#section-11.2"
}, {
  code: "423",
  phrase: "Locked",
  summary: "The source or destination resource of the method is locked (WebDAV)",
  reference: "https://tools.ietf.org/html/rfc4918#section-11.3"
}, {
  code: "424",
  phrase: "Failed Dependency",
  summary: "The method could not be performed because it depended on another action that failed (WebDAV)",
  reference: "https://tools.ietf.org/html/rfc4918#section-11.4"
}, {
  code: "425",
  phrase: "Too Early",
  summary: "The server is unwilling to process a request that might be replayed, such as one sent in TLS early data",
  reference: "https://tools.ietf.org/html/rfc8470#section-5.2"
}, {
  code: "426",
  phrase: "Upgrade Required",
  summary: "The client should switch to a different protocol",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.5.15"
}, {
  code: "428",
  phrase: "Precondition Required",
  summary: "The server requires the request to be conditional, for example with If-Match, to prevent lost updates",
  reference: "https://tools.ietf.org/html/rfc6585#section-3"
}, {
  code: "429",
  phrase: "Too Many Requests",
  summary: "The client has sent too many requests in a given amount of time (rate limiting). A Retry-After header may say how long to wait",
  reference: "https://tools.ietf.org/html/rfc6585#section-4"
}, {
  code: "431",
  phrase: "Request Header Fields Too Large",
  summary: "The server refuses the request because one header field, or all header fields together, are too large",
  reference: "https://tools.ietf.org/html/rfc6585#section-5"
}, {
  code: "451",
  phrase: "Unavailable For Legal Reasons",
  summary: "The server denies access to the resource as a consequence of a legal demand",
  reference: "https://tools.ietf.org/html/rfc7725#section-3"
}, {
  code: "500",
  phrase: "Internal Server Error",
  summary: "The server encountered an unexpected condition that prevented it from fulfilling the request",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.6.1"
}, {
  code: "501",
  phrase: "Not Implemented",
  summary: "The server does not support the functionality required to fulfill the request",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.6.2"
}, {
  code: "502",
  phrase: "Bad Gateway",
  summary: "The server, while acting as a gateway or proxy, received an invalid response from an inbound server",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.6.3"
}, {
  code: "503",
  phrase: "Service Unavailable",
  summary: "The server is currently unable to handle the request due to a temporary overload or scheduled maintenance",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.6.4"
}, {
  code: "504",
  phrase: "Gateway Timeout",
  summary: "The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.6.5"
}, {
  code: "505",
  phrase: "HTTP Version Not Supported",
  summary: "The server does not support, or refuses to support, the major version of HTTP that was used in the request",
  reference: "https://tools.ietf.org/html/rfc7231#section-6.6.6"
}, {
  code: "506",
  phrase: "Variant Also Negotiates",
  summary: "The server has an internal configuration error: the chosen variant resource is itself set up to do content negotiation",
  reference: "https://tools.ietf.org/html/rfc2295#section-8.1"
}, {
  code: "507",
  phrase: "Insufficient Storage",
  summary: "The server cannot store the representation needed to complete the request (WebDAV)",
  reference: "https://tools.ietf.org/html/rfc4918#section-11.5"
}, {
  code: "508",
  phrase: "Loop Detected",
  summary: "The server ended the operation because it found an infinite loop while processing a request with Depth: infinity (WebDAV)",
  reference: "https://tools.ietf.org/html/rfc5842#section-7.2"
}, {
  code: "510",
  phrase: "Not Extended",
  summary: "Further extensions to the request are required for the server to fulfill it. The defining RFC 2774 is now historic",
  reference: "https://tools.ietf.org/html/rfc2774#section-7"
}, {
  code: "511",
  phrase: "Network Authentication Required",
  summary: "The client needs to authenticate to gain network access, as with a captive portal on public Wi-Fi",
  reference: "https://tools.ietf.org/html/rfc6585#section-6"
}];
export default HTTP_STATUSES;