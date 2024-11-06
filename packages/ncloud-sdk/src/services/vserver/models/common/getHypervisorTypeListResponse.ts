/**
 * getHypervisorTypeList 응답
 * @see {@link }
 * @example
 * {
 *   "requestId": "",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 2,
 *   "hypervisorTypeList": [
 *     {
 *       "code": "XEN",
 *       "codeName": "XEN"
 *     },
 *     {
 *       "code": "KVM",
 *       "codeName": "KVM"
 *     }
 *   ]
 * }
 */
export type GetHypervisorTypeListResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: number;
    hypervisorTypeList: Array<{
        code: string;
        codeName: string;
    }>;
};
