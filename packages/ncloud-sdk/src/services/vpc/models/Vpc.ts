import { CommonCode } from './CommonCode';
/**
 * VPC 정보를 나타내는 인터페이스
 * @typedef {Object} Vpc
 * @property {string} vpcNo - VPC 번호
 * @property {string} vpcName - VPC 이름 (3~30자, 영문 소문자/숫자/'-' 허용)
 * @property {string} ipv4CidrBlock - VPC의 사설 IPv4 주소 범위
 * @property {CommonCode} vpcStatus - VPC 상태 정보
 * @property {string} regionCode - VPC가 위치한 리전 코드
 * @property {string} createDate - 생성 일시
 */
export interface Vpc {
    vpcNo: string;
    vpcName: string;
    ivp4CidrBlock: string;
    vpcStatus: CommonCode;
    regionCode: string;
    createDate: Date;
}
