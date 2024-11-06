/**
 * 블록 스토리지 인스턴스 리스트 삭제 요청 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-deleteblockstorageinstances}
 */
export type DeleteBlockStorageInstancesRequest = {
    /**
     * 리전 코드
     * 삭제할 블록 스토리지 인스턴스의 리전(Region) 결정 가능
     * @link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 삭제할 블록 스토리지 인스턴스 번호 리스트
     * @link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstorageinstancelist 액션을 통해 획득 가능
     * ex) blockStorageInstanceNoList.1=1234&blockStorageInstanceNoList.2=2345
     */
    blockStorageInstanceNoList: string[];

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
