/**
 * 공인 IP 인스턴스를 서버 인스턴스에 할당 응답
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-associatepublicipwithserverinstance}
 * @example
 * {
 *   "requestId": "18f578d6-9264-4b6d-8203-9d89c49cf85e",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 1,
 *   "publicIpInstanceList": [
 *     {
 *       "publicIpInstanceNo": "***7551",
 *       "publicIp": "***.***.111.215",
 *       "publicIpDescription": "",
 *       "createDate": "2020-08-19T16:52:50+0900",
 *       "publicIpInstanceStatusName": "설정중",
 *       "publicIpInstanceStatus": {
 *         "code": "RUN",
 *         "codeName": "run"
 *       },
 *       "serverInstanceNo": "***4299",
 *       "serverName": "test-***",
 *       "privateIp": "***.***.1.6",
 *       "publicIpInstanceOperation": {
 *         "code": "SET",
 *         "codeName": "SETTING OP"
 *       }
 *     }
 *   ]
 * }
 */
export type AssociatePublicIpWithServerInstanceResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: number;
    publicIpInstanceList: PublicIpInstance[];
};

type PublicIpInstance = {
    publicIpInstanceNo: string;
    publicIp: string;
    publicIpDescription: string;
    createDate: string;
    publicIpInstanceStatusName: string;
    publicIpInstanceStatus: {
        code: string;
        codeName: string;
    };
    serverInstanceNo: string;
    serverName: string;
    privateIp: string;
    publicIpInstanceOperation: {
        code: string;
        codeName: string;
    };
};
