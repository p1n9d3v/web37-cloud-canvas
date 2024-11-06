/**
 * ACG 생성 요청 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-createaccesscontrolgroup}
 */
export type CreateAccessControlGroupRequest = {
    /**
     * 리전 코드
     * ACG가 생성될 리전(Region) 결정 가능
     * regionCode는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist} 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * VPC 번호
     * ACG가 생성될 VPC 결정
     * vpcNo는 {@link https://api.ncloud-docs.com/docs/networking-vpc-vpcmanagement-getvpclist} 액션을 통해 획득 가능
     */
    vpcNo: string;

    /**
     * 생성할 ACG 이름
     * Min : 3, Max : 30
     * 소문자, 숫자, "-"의 특수문자만 허용하며 알파벳 문자로 시작해야 함
     * 영어 또는 숫자로 끝나야 함
     * Default : NAVER Cloud Platform가 자동으로 부여
     */
    accessControlGroupName?: string;

    /**
     * 생성할 ACG에 대한 설명
     * Min : 0, Max : 1000 Bytes
     */
    accessControlGroupDescription?: string;

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
