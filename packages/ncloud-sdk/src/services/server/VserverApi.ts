import { VserverApiClient } from './VserverApiClient';
import { ApiKeyCredentials } from './types';

export class VserverApi {
    private client: VserverApiClient;
    private readonly resourcePath: string;
    constructor(apiKey?: ApiKeyCredentials) {
        this.resourcePath = '/vserver/v2';
        this.client = new VserverApiClient(apiKey);
    }
}
