import * as url from 'url';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import { SuperAgentRequest } from 'superagent';

interface QueryParams {
  [key: string]: string | number | boolean;
}

/**
 * Generates an HMAC signature for API requests
 * @param req - The superagent request object
 * @param timestamp - Current timestamp
 * @param accessKey - API access key
 * @param secretKey - API secret key
 * @returns Base64 encoded HMAC signature
 */
export function generateSignature(
    req: SuperAgentRequest,
    timestamp: number,
    accessKey: string,
    secretKey: string
): string {
  const space = ' ';
  const newLine = '\n';
  const originalUrl = url.parse(req.url);

  let query = '';
//   const queryParams = req.qs as QueryParams;

//   for (const key in queryParams) {
//     if (queryParams.hasOwnProperty(key)) {
//       if (query === '') {
//         query += `${key}=${queryParams[key]}`;
//       } else {
//         query += `&${key}=${queryParams[key]}`;
//       }
//     }
//   }

  const message = [
    req.method,
    space,
    originalUrl.pathname,
    query !== '' ? `?${query}` : '',
    newLine,
    timestamp,
    newLine,
    accessKey
  ].join('');

  const hmac = hmacSHA256(message, secretKey);
  return Base64.stringify(hmac);
}