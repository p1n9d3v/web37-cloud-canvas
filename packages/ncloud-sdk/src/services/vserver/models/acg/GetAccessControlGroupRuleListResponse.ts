/**
 * ACG의 Rule 리스트 조회 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-getaccesscontrolgrouprulelist}
 * @example
 * {
 *   "requestId": "a6fe4c12-b592-41c6-acf9-dff0369f09b0",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": "2",
 *   "accessControlGroupRuleList": [
 *     {
 *       "accessControlGroupNo": "***63",
 *       "protocolType": {
 *         "code": "TCP",
 *         "codeName": "tcp",
 *         "number": 6
 *       },
 *       "ipBlock": "***.***.0.0/0",
 *       "accessControlGroupSequence": "",
 *       "portRange": "22",
 *       "accessControlGroupRuleType": {
 *         "code": "INBND",
 *         "codeName": "Inbound"
 *       },
 *       "accessControlGroupRuleDescription": ""
 *     },
 *     {
 *       "accessControlGroupNo": "***63",
 *       "protocolType": {
 *         "code": "TCP",
 *         "codeName": "tcp",
 *         "number": 6
 *       },
 *       "ipBlock": "***.***.0.0/0",
 *       "accessControlGroupSequence": "",
 *       "portRange": "22",
 *       "accessControlGroupRuleType": {
 *         "code": "OTBND",
 *         "codeName": "Outbound"
 *       },
 *       "accessControlGroupRuleDescription": ""
 *     }
 *   ]
 * }
 */
export type GetAccessControlGroupRuleListResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: string;
    accessControlGroupRuleList: Array<{
        accessControlGroupNo: string;
        protocolType: {
            code: string;
            codeName: string;
            number: number;
        };
        ipBlock: string;
        accessControlGroupSequence: string;
        portRange: string;
        accessControlGroupRuleType: {
            code: string;
            codeName: string;
        };
        accessControlGroupRuleDescription: string;
    }>;
};
