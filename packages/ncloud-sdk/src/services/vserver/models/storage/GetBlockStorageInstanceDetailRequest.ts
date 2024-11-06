/**
 * 블록 스토리지 인스턴스 상세 정보 조회 요청 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstorageinstancedetail}
 */
export type GetBlockStorageInstanceDetailRequest = {
    /**
     * 리전 코드
     * 블록 스토리지 인스턴스 상세 정보가 조회될 리전(Region) 결정 가능
     * @link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 조회할 블록 스토리지 인스턴스 번호
     * @link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstorageinstancelist 액션을 통해 획득 가능
     */
    blockStorageInstanceNo: string;

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
