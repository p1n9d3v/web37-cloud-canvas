import { generateSignature } from "./signature";
interface ApiKey {
    accessKey?: string;
    secretKey?: string;
}

export class ApiClient {
    public apiKey: ApiKey;
    public apiGWEndPoint: string;
    public basePath: string;
    public timeout: number;

    constructor(apiKey: ApiKey){
        this.apiKey = {};
        if(apiKey.accessKey && apiKey.secretKey) this.apiKey = apiKey;
        this.apiGWEndPoint = 'https://ncloud.apigw.ntruss.com';
        if(process.env.NCLOUD_API_GW)
            this.apiGWEndPoint = process.env.NCLOUD_API_GW;
        this.basePath = (this.apiGWEndPoint + '/vserver/v2').replace(/\/+$/, '');
        this.timeout = 60000;
    }

    applyAuthToRequest(request: any, apiKey: ApiKey){
        if(!apiKey.accessKey || !apiKey.secretKey)
            throw new Error(`Not Found AccessKey or SecretKey!`);
        const timestamp = Date.now();
        const ncloudHeader = {
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-iam-access-key': apiKey.accessKey,
            'x-ncp-apigw-signature-v1': generateSignature(request, timestamp, apiKey.accessKey, apiKey.secretKey)
        }
        return ncloudHeader;
    }

    async callAPI(){

    }
}