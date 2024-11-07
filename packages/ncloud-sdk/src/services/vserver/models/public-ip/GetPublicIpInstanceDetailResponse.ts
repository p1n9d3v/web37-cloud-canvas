/**
 * 공인 IP 인스턴스 상세 정보 조회 응답
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-getpublicipinstancedetail}
 * @example
 * {
 *   "requestId": "d9a37d96-eaca-41e0-9878-ffb3085b77ca",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 1,
 *   "publicIpInstanceList": [
 *     {
 *       "publicIpInstanceNo": "***7551",
 *       "publicIp": "***.***.111.215",
 *       "publicIpDescription": "",
 *       "createDate": "2020-08-19T14:34:41+0900",
 *       "publicIpInstanceStatusName": "운영중",
 *       "publicIpInstanceStatus": {
 *         "code": "RUN",
 *         "codeName": "run"
 *       },
 *       "serverInstanceNo": "***4299",
 *       "serverName": "test-***",
 *       "privateIp": "***.***.1.6",
 *       "publicIpInstanceOperation": {
 *         "code": "NULL",
 *         "codeName": "NULL OP"
 *       }
 *     }
 *   ]
 * }
 */
export type GetPublicIpInstanceDetailResponse = {
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
