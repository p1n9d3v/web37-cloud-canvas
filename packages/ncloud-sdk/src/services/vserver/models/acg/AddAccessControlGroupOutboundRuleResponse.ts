/**
 * ACG의 Outbound Rule 리스트 추가 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-addaccesscontrolgroupoutboundrule}
 * @example
 * {
 *   "requestId": "2dc83aed-e495-4cc2-a695-e6e253200f42",
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
 *       "portRange": "80",
 *       "accessControlGroupRuleType": {
 *         "code": "OTBND",
 *         "codeName": "Outbound"
 *       },
 *       "accessControlGroupRuleDescription": ""
 *     }
 *   ]
 * }
 */
export type AddAccessControlGroupOutboundRuleResponse = {
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
