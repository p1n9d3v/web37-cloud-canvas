import { VpcList } from './VpcList';
/**
 * API 응답의 기본 구조
 * @typedef {Object} CommonResponse
 * @property {string} requestId - 요청 ID
 * @property {string} returnCode - 응답 코드
 * @property {string} returnMessage - 응답 메시지
 * @property {number} totalRows - 전체 행 수
 */
export interface CommonResponse extends VpcList {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: number;
}
