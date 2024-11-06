/**
 * 블록 스토리지 인스턴스 리스트를 조회하는 요청 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstorageinstancelist}
 */
export type GetBlockStorageInstanceListRequest = {
    /**
     * 리전 코드
     * 블록 스토리지 인스턴스 리스트가 조회될 리전 결정
     * @link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist 를 통해 획득
     * 기본값 : getRegionList 조회 결과의 첫 번째 리전
     */
    regionCode?: string;

    /**
     * 존 코드
     * 블록 스토리지 인스턴스 리스트가 조회될 존 결정 가능
     * @link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getzonelist 를 통해 획득
     */
    zoneCode?: string;

    /**
     * 블록 스토리지 인스턴스 번호 리스트
     * 블록 스토리지 인스턴스 번호로 필터링하여 검색
     * @link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstorageinstancelist 를 통해 획득
     * 예시: blockStorageInstanceNoList.1=1234&blockStorageInstanceNoList.2=2345
     */
    blockStorageInstanceNoList?: string[];

    /**
     * 블록 스토리지 인스턴스 상태 코드
     * 블록 스토리지 인스턴스 상태 코드로 필터링하여 검색 가능
     */
    blockStorageInstanceStatusCode?: 'INIT' | 'CREAT' | 'ATTAC';

    /**
     * 블록 스토리지 디스크 유형 코드
     * 블록 스토리지 디스크 유형으로 필터링하여 검색
     */
    blockStorageDiskTypeCode?: 'NET';

    /**
     * 블록 스토리지 디스크 상세 유형 코드
     * 블록 스토리지 디스크 상세 유형으로 필터링하여 검색
     */
    blockStorageDiskDetailTypeCode?: 'HDD' | 'SSD';

    /**
     * 블록 스토리지 사이즈
     * 입력한 GB 단위 사이즈 이하의 블록스토리지를 필터링하여 검색
     */
    blockStorageSize?: number;

    /**
     * 블록 스토리지 유형 코드 리스트
     * 스토리지가 블록 스토리지 유형으로 필터링하여 검색
     * 유효 값: BASIC (서버 인스턴스의 기본 블록 스토리지) | SVRBS (서버 인스턴스의 추가 블록 스토리지)
     */
    blockStorageTypeCodeList?: Array<'BASIC' | 'SVRBS'>;

    /**
     * 서버 인스턴스 번호
     * 블록 스토리지가 할당된 서버 인스턴스 번호로 필터링하여 검색 가능
     * @link https://api.ncloud-docs.com/docs/compute-vserver-server-getserverinstancelist 를 통해 획득 가능
     */
    serverInstanceNo?: string;

    /**
     * 블록 스토리지 이름
     * 블록 스토리지 이름으로 필터링하여 검색 가능
     * blockStorageName, serverName, connectionInfo 중 하나의 검색 조건만 사용 가능
     */
    blockStorageName?: string;

    /**
     * 서버 이름
     * 블록 스토리지가 할당된 서버 이름으로 필터링하여 검색 가능
     * blockStorageName, serverName, connectionInfo 중 하나의 검색 조건만 사용 가능
     */
    serverName?: string;

    /**
     * 연결 정보
     * 블록 스토리지가 할당된 서버와 디바이스 연결 정보로 필터링하여 검색 가능
     * 다음 두가지 형태로 사용 가능
     * Options : '서버이름[공백]디바이스이름' (s173dc67dc2e /dev/xvda) | '서버이름:디바이스이름' (s173dc67dc2e:/dev/xvda)
     * blockStorageName, serverName, connectionInfo 중 하나의 검색 조건만 사용 가능
     */
    connectionInfo?: string;

    /**
     * 블록 스토리지 볼륨타입 코드 리스트
     * 블록 스토리지 볼륨타입 코드로 필터링하여 검색 가능
     * Options : HDD | SSD | FB1 | CB1
     */
    blockStorageVolumeTypeCodeList?: Array<'HDD' | 'SSD' | 'FB1' | 'CB1'>;

    /**
     * 하이퍼바이저 타입 코드 리스트
     * 하이퍼바이저 타입 코드로 필터링하여 검색 가능
     * Options : XEN | KVM
     */
    hypervisorTypeCodeList?: Array<'XEN' | 'KVM'>;

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
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
