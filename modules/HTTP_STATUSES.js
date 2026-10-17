// HTTP status codes from the IANA HTTP Status Code Registry,
// each with a link to the RFC section that defines it.
const HTTP_STATUSES = [
  {
    code: "100",
    phrase: "Continue",
    summary: "The server has received the request headers, and that the client should proceed to send the request body",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.2.1"
  },
  {
    code: "101",
    phrase: "Switching Protocols",
    summary: "The requester has asked the server to switch protocols and the server is acknowledging that it will do so",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.2.2",
    headers: ["Upgrade"]
  },
  {
    code: "102",
    phrase: "Processing",
    summary: "The server has received the request and is still processing it, so no response is available yet (WebDAV)",
    reference: "https://www.rfc-editor.org/rfc/rfc2518#section-10.1"
  },
  {
    code: "103",
    phrase: "Early Hints",
    summary: "The server sends preliminary headers, usually Link headers, so the client can start preloading resources before the final response",
    reference: "https://www.rfc-editor.org/rfc/rfc8297#section-2",
    headers: ["Link"]
  },
  {
    code: "200",
    phrase: "OK",
    summary: "Standard response for successful HTTP requests",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.3.1",
    cacheable: true
  },
  {
    code: "201",
    phrase: "Created",
    summary: "The request has been fulfilled and resulted in a new resource being created",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.3.2",
    headers: ["Location"]
  },
  {
    code: "202",
    phrase: "Accepted",
    summary: "The request has been accepted for processing, but the processing has not been completed",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.3.3"
  },
  {
    code: "203",
    phrase: "Non-Authoritative Information",
    summary: "The server successfully processed the request, but is returning information that may be from another source",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.3.4",
    cacheable: true
  },
  {
    code: "204",
    phrase: "No Content",
    summary: "The server successfully processed the request, but is not returning any content",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.3.5",
    cacheable: true
  },
  {
    code: "205",
    phrase: "Reset Content",
    summary: "The server successfully processed the request, but is not returning any content. Unlike a 204 response, this response requires that the requester reset the document view",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.3.6"
  },
  {
    code: "206",
    phrase: "Partial Content",
    summary: "The server is delivering only part of the resource (byte serving) due to a range header sent by the client",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.3.7",
    headers: ["Content-Range"],
    cacheable: true
  },
  {
    code: "207",
    phrase: "Multi-Status",
    summary: "The response body holds separate status codes for multiple independent operations (WebDAV)",
    reference: "https://www.rfc-editor.org/rfc/rfc4918#section-11.1"
  },
  {
    code: "208",
    phrase: "Already Reported",
    summary: "The members of a binding were already listed in an earlier part of this multistatus response, so they are not repeated (WebDAV)",
    reference: "https://www.rfc-editor.org/rfc/rfc5842#section-7.1"
  },
  {
    code: "226",
    phrase: "IM Used",
    summary: "The server fulfilled a GET request, and the response is the result of instance manipulations applied to the current instance",
    reference: "https://www.rfc-editor.org/rfc/rfc3229#section-10.4.1"
  },
  {
    code: "300",
    phrase: "Multiple Choices",
    summary: "Indicates multiple options for the resource that the client may follow",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.4.1",
    cacheable: true
  },
  {
    code: "301",
    phrase: "Moved Permanently",
    summary: "This and all future requests should be directed to the given URI",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.4.2",
    headers: ["Location"],
    cacheable: true,
    note: "Clients may change a POST to a GET when they follow a 301. Use 308 to keep the request method."
  },
  {
    code: "302",
    phrase: "Found",
    summary: "The target resource resides temporarily under a different URI",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.4.3",
    headers: ["Location"],
    note: "Clients may change a POST to a GET when they follow a 302. Use 307 to keep the request method."
  },
  {
    code: "303",
    phrase: "See Other",
    summary: "The server is redirecting to a different URI which accesses the same resource",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.4.4",
    headers: ["Location"]
  },
  {
    code: "304",
    phrase: "Not Modified",
    summary: "There is no need to retransmit the resource, since the client still has a previously-downloaded copy",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.4.5"
  },
  {
    code: "305",
    phrase: "Use Proxy",
    summary: "The requested resource must be accessed through the proxy given in the response. Deprecated for security reasons",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.4.6",
    deprecated: true
  },
  {
    code: "306",
    phrase: "(Unused)",
    summary: "Used in an earlier draft of HTTP/1.1 for Switch Proxy. The code is reserved and no longer used",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.4.7",
    deprecated: true
  },
  {
    code: "307",
    phrase: "Temporary Redirect",
    summary: "The target resource resides temporarily under a different URI, and the client must not change the request method when it follows the redirect",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.4.8",
    headers: ["Location"],
    note: "Like 302, but the client must keep the request method and body."
  },
  {
    code: "308",
    phrase: "Permanent Redirect",
    summary: "The target resource has a new permanent URI, and the client must not change the request method when it follows the redirect",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.4.9",
    headers: ["Location"],
    cacheable: true,
    note: "Like 301, but the client must keep the request method and body."
  },
  {
    code: "400",
    phrase: "Bad Request",
    summary: "The request could not be understood by the server due to malformed syntax",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.1",
    note: "Use 400 for malformed syntax. Use 422 when the syntax is valid but the content fails validation."
  },
  {
    code: "401",
    phrase: "Unauthorized",
    summary: "Authentication is required and has failed or has not yet been provided",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.2",
    headers: ["WWW-Authenticate"],
    note: "Use 401 when the client is not authenticated. Use 403 when the client is authenticated but has no permission."
  },
  {
    code: "402",
    phrase: "Payment Required",
    summary: "The 402 (Payment Required) status code is reserved for future use",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.3"
  },
  {
    code: "403",
    phrase: "Forbidden",
    summary: "The server understood the request but refuses to authorize it",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.4",
    note: "Use 403 when the client is authenticated but has no permission. Use 401 when the client is not authenticated."
  },
  {
    code: "404",
    phrase: "Not Found",
    summary: "The requested resource could not be found but may be available again in the future",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.5",
    cacheable: true,
    note: "Use 410 instead when you know the resource was removed on purpose and will not come back."
  },
  {
    code: "405",
    phrase: "Method Not Allowed",
    summary: "A request was made of a resource using a request method not supported by that resource",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.6",
    headers: ["Allow"],
    cacheable: true
  },
  {
    code: "406",
    phrase: "Not Acceptable",
    summary: "The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.7"
  },
  {
    code: "407",
    phrase: "Proxy Authentication Required",
    summary: "The client must first authenticate itself with the proxy",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.8",
    headers: ["Proxy-Authenticate"]
  },
  {
    code: "408",
    phrase: "Request Timeout",
    summary: "The server timed out waiting for the request",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.9"
  },
  {
    code: "409",
    phrase: "Conflict",
    summary: "The request could not be processed because of conflict in the request",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.10"
  },
  {
    code: "410",
    phrase: "Gone",
    summary: "The resource requested is no longer available and will not be available again",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.11",
    cacheable: true,
    note: "Use 404 instead when you do not know whether the removal is permanent."
  },
  {
    code: "411",
    phrase: "Length Required",
    summary: "The request did not specify the length of its content, which is required by the requested resource",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.12"
  },
  {
    code: "412",
    phrase: "Precondition Failed",
    summary: "The server does not meet one of the preconditions that the requester put on the request",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.13"
  },
  {
    code: "413",
    phrase: "Content Too Large",
    summary: "The request is larger than the server is willing or able to process",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.14"
  },
  {
    code: "414",
    phrase: "URI Too Long",
    summary: "The URI provided was too long for the server to process",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.15",
    cacheable: true
  },
  {
    code: "415",
    phrase: "Unsupported Media Type",
    summary: "The request entity has a media type which the server or resource does not support",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.16"
  },
  {
    code: "416",
    phrase: "Range Not Satisfiable",
    summary: "The client has asked for a portion of the file (byte serving), but the server cannot supply that portion",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.17",
    headers: ["Content-Range"]
  },
  {
    code: "417",
    phrase: "Expectation Failed",
    summary: "The server cannot meet the requirements of the Expect request-header field",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.18"
  },
  {
    code: "418",
    phrase: "I'm a teapot",
    summary: "Reserved. Originally an April Fools joke in RFC 2324 (HTCPCP), and some servers still return it for requests they refuse to handle",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.19"
  },
  {
    code: "421",
    phrase: "Misdirected Request",
    summary: "The request was sent to a server that cannot produce a response for this combination of scheme and authority",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.20"
  },
  {
    code: "422",
    phrase: "Unprocessable Content",
    summary: "The server understands the content type and the syntax of the request content is correct, but it was unable to process the contained instructions",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.21",
    note: "Use 422 when the syntax is valid but the content fails validation. Use 400 for malformed syntax."
  },
  {
    code: "423",
    phrase: "Locked",
    summary: "The source or destination resource of the method is locked (WebDAV)",
    reference: "https://www.rfc-editor.org/rfc/rfc4918#section-11.3"
  },
  {
    code: "424",
    phrase: "Failed Dependency",
    summary: "The method could not be performed because it depended on another action that failed (WebDAV)",
    reference: "https://www.rfc-editor.org/rfc/rfc4918#section-11.4"
  },
  {
    code: "425",
    phrase: "Too Early",
    summary: "The server is unwilling to process a request that might be replayed, such as one sent in TLS early data",
    reference: "https://www.rfc-editor.org/rfc/rfc8470#section-5.2"
  },
  {
    code: "426",
    phrase: "Upgrade Required",
    summary: "The client should switch to a different protocol",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.22",
    headers: ["Upgrade"]
  },
  {
    code: "428",
    phrase: "Precondition Required",
    summary: "The server requires the request to be conditional, for example with If-Match, to prevent lost updates",
    reference: "https://www.rfc-editor.org/rfc/rfc6585#section-3"
  },
  {
    code: "429",
    phrase: "Too Many Requests",
    summary: "The client has sent too many requests in a given amount of time (rate limiting). A Retry-After header may say how long to wait",
    reference: "https://www.rfc-editor.org/rfc/rfc6585#section-4",
    headers: ["Retry-After"]
  },
  {
    code: "431",
    phrase: "Request Header Fields Too Large",
    summary: "The server refuses the request because one header field, or all header fields together, are too large",
    reference: "https://www.rfc-editor.org/rfc/rfc6585#section-5"
  },
  {
    code: "451",
    phrase: "Unavailable For Legal Reasons",
    summary: "The server denies access to the resource as a consequence of a legal demand",
    reference: "https://www.rfc-editor.org/rfc/rfc7725#section-3"
  },
  {
    code: "500",
    phrase: "Internal Server Error",
    summary: "The server encountered an unexpected condition that prevented it from fulfilling the request",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.6.1"
  },
  {
    code: "501",
    phrase: "Not Implemented",
    summary: "The server does not support the functionality required to fulfill the request",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.6.2",
    cacheable: true
  },
  {
    code: "502",
    phrase: "Bad Gateway",
    summary: "The server, while acting as a gateway or proxy, received an invalid response from an inbound server",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.6.3",
    note: "The upstream server sent an invalid response. Use 504 when the upstream server did not respond in time."
  },
  {
    code: "503",
    phrase: "Service Unavailable",
    summary: "The server is currently unable to handle the request due to a temporary overload or scheduled maintenance",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.6.4",
    headers: ["Retry-After"]
  },
  {
    code: "504",
    phrase: "Gateway Timeout",
    summary: "The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.6.5",
    note: "The upstream server did not respond in time. Use 502 when it sent an invalid response."
  },
  {
    code: "505",
    phrase: "HTTP Version Not Supported",
    summary: "The server does not support, or refuses to support, the major version of HTTP that was used in the request",
    reference: "https://www.rfc-editor.org/rfc/rfc9110#section-15.6.6"
  },
  {
    code: "506",
    phrase: "Variant Also Negotiates",
    summary: "The server has an internal configuration error: the chosen variant resource is itself set up to do content negotiation",
    reference: "https://www.rfc-editor.org/rfc/rfc2295#section-8.1"
  },
  {
    code: "507",
    phrase: "Insufficient Storage",
    summary: "The server cannot store the representation needed to complete the request (WebDAV)",
    reference: "https://www.rfc-editor.org/rfc/rfc4918#section-11.5"
  },
  {
    code: "508",
    phrase: "Loop Detected",
    summary: "The server ended the operation because it found an infinite loop while processing a request with Depth: infinity (WebDAV)",
    reference: "https://www.rfc-editor.org/rfc/rfc5842#section-7.2"
  },
  {
    code: "510",
    phrase: "Not Extended",
    summary: "Further extensions to the request are required for the server to fulfill it. The defining RFC 2774 is now historic",
    reference: "https://www.rfc-editor.org/rfc/rfc2774#section-7"
  },
  {
    code: "511",
    phrase: "Network Authentication Required",
    summary: "The client needs to authenticate to gain network access, as with a captive portal on public Wi-Fi",
    reference: "https://www.rfc-editor.org/rfc/rfc6585#section-6"
  }
];

export default HTTP_STATUSES;
