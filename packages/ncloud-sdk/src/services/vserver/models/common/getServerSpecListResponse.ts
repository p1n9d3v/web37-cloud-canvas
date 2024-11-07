/**
 * getServerSpecList 응답
 * @see {@link }
 * @example
 * {
 *   "requestId": "",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 1,
 *   "serverSpecList": [
 *     {
 *       "serverSpecCode": "c2-g3",
 *       "hypervisorType": {
 *         "code": "KVM",
 *         "codeName": "KVM"
 *       },
 *       "cpuArchitectureType": {
 *         "code": "X86_64",
 *         "codeName": "x86 64bit"
 *       },
 *       "generationCode": "G3",
 *       "cpuCount": 2,
 *       "memorySize": 4294967296,
 *       "blockStorageMaxCount": 20,
 *       "blockStorageMaxIops": 5250,
 *       "blockStorageMaxThroughput": 81,
 *       "networkPerformance": 17179869184,
 *       "networkInterfaceMaxCount": 3,
 *       "serverSpecDescription": "vCPU 2EA, Memory 4GB",
 *       "productCode": "SVR.VSVR.HICPU.C002.M004.G003"
 *     }
 *   ]
 * }
 */
export type GetServerSpecListResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: number;
    serverSpecList: Array<{
        serverSpecCode: string;
        hypervisorType: {
            code: string;
            codeName: string;
        };
        cpuArchitectureType: {
            code: string;
            codeName: string;
        };
        generationCode: string;
        cpuCount: number;
        memorySize: number;
        blockStorageMaxCount: number;
        blockStorageMaxIops: number;
        blockStorageMaxThroughput: number;
        networkPerformance: number;
        networkInterfaceMaxCount: number;
        serverSpecDescription: string;
        productCode: string;
    }>;
};
