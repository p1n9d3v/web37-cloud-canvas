import { VpcList } from './VpcList';
export interface CommonResponse extends VpcList {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: number;
}
