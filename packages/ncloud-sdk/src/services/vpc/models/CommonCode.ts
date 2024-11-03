/**
 * VPC 상태를 나타내는 공통 코드
 * @typedef {Object} CommonCode
 * @property {string} code - 5자리 이내의 코드 (INIT | CREAT | RUN | NSTOP)
 * @property {string} codeName - 코드에 해당하는 코드 이름 (INIT 상태 | 생성 | 운영 | 정상 정지)
 */
export interface CommonCode {
    code: string;
    codeName: string;
}
