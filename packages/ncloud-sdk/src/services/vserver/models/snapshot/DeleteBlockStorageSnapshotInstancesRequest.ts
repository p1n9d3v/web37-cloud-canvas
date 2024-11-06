/**
 * 블록 스토리지 스냅샷 인스턴스 삭제 요청
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-snapshot-deleteblockstoragesnapshotinstances}
 */
export type DeleteBlockStorageSnapshotInstancesRequest = {
    /**
     * 리전 코드
     * 삭제할 블록 스토리지 스냅샷 인스턴스의 리전(Region) 결정 가능
     * regionCode는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist} 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 삭제할 블록 스토리지 스냅샷 인스턴스 번호 리스트
     * blockStorageSnapshotInstanceNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-snapshot-getblockstoragesnapshotinstancelist} 액션을 통해 획득 가능
     */
    blockStorageSnapshotInstanceNoList: string[];

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
