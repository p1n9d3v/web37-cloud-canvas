/**
 * 공인 IP 인스턴스 생성 응답
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-createpublicipinstance}
 * @example
 * {
 *   "requestId": "97f84e7a-f03d-4bce-9e7f-b3a83c812a3d",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 1,
 *   "publicIpInstanceList": [
 *     {
 *       "publicIpInstanceNo": "***7551",
 *       "publicIp": "***.***.111.215",
 *       "publicIpDescription": "",
 *       "createDate": "2020-08-19T16:33:10+0900",
 *       "publicIpInstanceStatusName": "생성중",
 *       "publicIpInstanceStatus": {
 *         "code": "INIT",
 *         "codeName": "init"
 *       },
 *       "serverInstanceNo": "***4299",
 *       "serverName": "test-***",
 *       "privateIp": "***.***.1.6",
 *       "publicIpInstanceOperation": {
 *         "code": "CREAT",
 *         "codeName": "CREATE OP"
 *       }
 *     }
 *   ]
 * }
 */
export type CreatePublicIpInstanceResponse = {
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
