/**
 * FlowLog 활성화 요청 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-enableflowlog}
 */
export type EnableFlowLogRequest = {
    /**
     * 리전 코드
     * 네트워크 인터페이스 리스트가 조회될 리전(Region) 결정 가능
     * regionCode는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist} 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전 선택
     */
    regionCode?: string;

    /**
     * 네트워크 인터페이스 번호
     * networkInterfaceNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-getnetworkinterfacelist} 액션을 통해 획득 가능
     */
    networkInterfaceNo: string;

    /**
     * 수집 액션 타입 허용(ALLOW), 거부(DENY), 모두(ALL)
     * Options : ALLOW, DENY, ALL
     */
    collectActionTypeCode: 'ALLOW' | 'DENY' | 'ALL';

    /**
     * 수집 주기 (분)
     * Default : 15
     */
    collectIntervalMinute?: number;

    /**
     * 저장소 타입. 오브젝트 스토리지(OBJT)
     * Default : OBJT
     */
    storageTypeCode?: 'OBJT';

    /**
     * FlowLog 트래픽을 저장 할 오브젝트 스토리지 버킷 이름
     * bucketName은 {@link https://api.ncloud-docs.com/docs/storage-objectstorage-listbuckets} 액션을 통해 획득 가능
     */
    storageBucketName: string;

    /**
     * FlowLog 트래픽을 저장할 오브젝트 스토리지 버킷 내에 디렉터리 이름
     * Default: VPC_FLOW_LOG
     */
    storageBucketDirectoryName?: string;

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
