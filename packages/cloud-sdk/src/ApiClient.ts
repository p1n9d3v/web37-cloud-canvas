import axios, { AxiosInstance, AxiosRequestConfig, AxiosHeaders } from 'axios';
import { generateSignature } from './signature';
import { ApiKeyCredentials } from './types';

export class ApiClient {
    private readonly baseURL: string;
    private readonly apiKey?: ApiKeyCredentials;
    private readonly axiosInstance: AxiosInstance;

    constructor(
        apiKey?: ApiKeyCredentials,
        service: 'server' | 'vpc' | 'subnet' = 'server',
    ) {
        const apigwEndpoint =
            process.env.NCLOUD_API_GW || 'https://ncloud.apigw.ntruss.com';
        this.baseURL = `${apigwEndpoint}/${service}/v2`;
        this.apiKey = apiKey;

        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            timeout: 60000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.setupRequestInterceptor();
    }

    private setupRequestInterceptor(): void {
        this.axiosInstance.interceptors.request.use((config) => {
            const timestamp = Date.now();

            const params = {
                ...config.params,
            };

            if (this.apiKey) {
                const signature = generateSignature({
                    method: config.method?.toUpperCase() || 'GET',
                    url: this.baseURL + config.url,
                    timestamp,
                    params,
                    apiKey: this.apiKey,
                    baseURL: this.baseURL,
                });

                if (config.headers instanceof AxiosHeaders) {
                    config.headers.set('x-ncp-apigw-timestamp', timestamp);
                    config.headers.set(
                        'x-ncp-iam-access-key',
                        this.apiKey.accessKey,
                    );
                    config.headers.set('x-ncp-apigw-signature-v2', signature);
                }
            }
            config.params = params;
            config.responseType = 'json';
            return config;
        });
    }

    async request<T = any>(config: AxiosRequestConfig): Promise<T> {
        try {
            console.log(config);
            const response = await this.axiosInstance.request<T>({
                ...config,
                params: {
                    ...config.params,
                    responseFormatType: 'json',
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('API Error:', {
                    status: error.response?.status,
                    data: error.response?.data,
                });
                throw new Error(error.response?.data?.message || error.message);
            }
            throw error;
        }
    }
}
