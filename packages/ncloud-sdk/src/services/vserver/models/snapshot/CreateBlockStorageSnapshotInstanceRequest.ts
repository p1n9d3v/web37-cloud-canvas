/**
 * 블록 스토리지 스냅샷 인스턴스 생성 요청
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-snapshot-createblockstoragesnapshotinstance}
 */
export type CreateBlockStorageSnapshotInstanceRequest = {
    /**
     * 리전 코드
     * originalBlockStorageInstanceNo 에 해당하는 regionCode 입력 (블록스토리지가 위치한 곳에만 스냅샷 생성 가능)
     * regionCode는 {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstorageinstancelist} 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 원본 블록 스토리지 인스턴스 번호
     * 스냅샷을 생성할 대상이 되는 블록 스토리지 결정 가능
     * originalBlockStorageInstanceNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstorageinstancelist} 액션을 통해 획득 가능
     */
    originalBlockStorageInstanceNo: string;

    /**
     * 블록 스토리지 스냅샷 이름
     * Default : NAVER CLOUD PLATFORM가 자동으로 부여
     */
    blockStorageSnapshotName?: string;

    /**
     * 생성할 블록 스토리지 스냅샷에 대한 설명
     */
    blockStorageSnapshotDescription?: string;

    /**
     * 스냅샷 유형 코드
     * 스냅샷 유형 결정 가능
     * 증분 스냅샷 생성을 위해서는 전체 스냅샷을 먼저 생성해야함
     * 증분 스냅샷은 7개까지 생성 가능함
     * Options : FULL | INCREMENTAL
     * Default : FULL
     */
    snapshotTypeCode?: 'FULL' | 'INCREMENTAL';

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
