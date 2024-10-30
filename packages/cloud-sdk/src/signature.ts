import { createHmac } from 'crypto';
import { ApiKeyCredentials, RequestConfig } from './types';

interface SignatureConfig extends RequestConfig {
    apiKey: ApiKeyCredentials;
    baseURL: string;
}

export function generateSignature({
    method,
    url,
    timestamp,
    params,
    apiKey,
}: SignatureConfig): string {
    const space = ' ';
    const newLine = '\n';
    /*const paramsObject = Object.entries(params as Record<string, string>);
    const query = paramsObject.reduce((acc, [key, value], index) => {
        index !== paramsObject.length - 1 ?
            acc += `${key}=${value}&` :
            acc += `${key}=${value}`
        return acc;

    }, '');
    const fullUrl = query
        ? url + '?' + query
        : url;*/

    const path = url.replace('https://ncloud.apigw.ntruss.com', '');

    const fullUrl = params
        ? `${path}?${new URLSearchParams(params).toString()}`
        : path;

    console.log('Full URL:', fullUrl);

    // const fullUrl =
    //     '/vpc/v2/createVpc?regionCode=KR&vpcName=test-vpc-173025187&ipv4CidrBlock=10.0.0.0%2F16&responseFormatType=json';
    const message = [
        method,
        space,
        fullUrl,
        newLine,
        timestamp,
        newLine,
        apiKey.accessKey,
    ].join('');

    return createHmac('sha256', apiKey.secretKey)
        .update(message)
        .digest('base64');
}
