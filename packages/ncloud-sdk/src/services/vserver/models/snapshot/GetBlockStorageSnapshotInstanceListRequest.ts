/**
 * 블록 스토리지 스냅샷 인스턴스 리스트를 조회하는 요청 파라미터
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-snapshot-getblockstoragesnapshotinstancelist}
 */
export type GetBlockStorageSnapshotInstanceListRequest = {
    /**
     * 리전 코드
     * 블록 스토리지 스냅샷 인스턴스 리스트가 조회될 리전(Region) 결정 가능
     * regionCode는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist} 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 블록 스토리지 스냅샷 인스턴스 번호 리스트
     * 블록 스토리지 스냅샷 인스턴스 번호로 필터링하여 검색 가능
     * blockStorageSnapshotInstanceNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-snapshot-getblockstoragesnapshotinstancelist} 액션을 통해 획득 가능
     */
    blockStorageSnapshotInstanceNoList?: string[];

    /**
     * 블록 스토리지 스냅샷 이름
     * 블록 스토리지 스냅샷 이름으로 필터링하여 검색 가능
     */
    blockStorageSnapshotName?: string;

    /**
     * 블록 스토리지 스냅샷 인스턴스 상태 코드
     * 블록 스토리지 스냅샷 인스턴스 상태 코드로 필터링하여 검색 가능
     * Options : INIT | CREAT
     */
    blockStorageSnapshotInstanceStatusCode?: 'INIT' | 'CREAT';

    /**
     * 원본 블록 스토리지 인스턴스 번호 리스트
     * 원본 블록 스토리지 인스턴스 번호로 필터링하여 검색 가능
     * originalBlockStorageInstanceNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstorageinstancelist} 액션을 통해 획득 가능
     */
    originalBlockStorageInstanceNoList?: string[];

    /**
     * 블록 스토리지 스냅샷 볼륨 사이즈
     * 입력한 GB 단위 사이즈 이하의 블록스토리지 스냅샷을 필터링하여 검색 가능
     */
    blockStorageSnapshotVolumeSize?: number;

    /**
     * 원본 블록 스토리지 볼륨 암호화 여부
     * 원본 블록 스토리지 볼륨의 암호화 여부로 필터링하여 검색 가능
     */
    isEncryptedOriginalBlockStorageVolume?: boolean;

    /**
     * 하이퍼바이저 타입 코드 리스트
     * 하이퍼바이저 타입 코드로 필터링하여 검색 가능
     * Options : XEN | KVM
     */
    hypervisorTypeCodeList?: ('XEN' | 'KVM')[];

    /**
     * 내 서버 이미지 생성 가능 여부
     * 내 서버 이미지 생성 가능 여부로 필터링하여 검색 가능
     */
    isBootable?: boolean;

    /**
     * 페이징된 결과의 페이지 번호
     * 결과값을 pageNo, pageSize를 이용하여 페이징 처리 가능
     */
    pageNo?: number;

    /**
     * 페이징 시 보여줄 각 페이지 사이즈
     * 결과값을 pageNo, pageSize를 이용하여 페이징 처리 가능
     * pageNo 입력시 반드시 입력 필요
     */
    pageSize?: number;

    /**
     * 정렬 대상
     * 결과값을 블록 스토리지 스냅샷 이름으로 정렬 가능
     * Options : blockStorageSnapshotName
     */
    sortedBy?: 'blockStorageSnapshotName';

    /**
     * 정렬 순서
     * sortedBy 이용시 오름차순/내림차순 정렬 설정
     * Options : ASC (오름차순) | DESC (내림차순)
     * Default : ASC
     */
    sortingOrder?: 'ASC' | 'DESC';

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
